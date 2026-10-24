/* =====================================================================
   EverCloud order API  (Cloudflare Worker)
   Browser  ->  POST /api/order  ->  this file  ->  D1 database

   Security rules this file enforces:
   1. The browser sends CHOICES (package id, add-on ids), never prices.
      Prices come from public/settings.js on the server side.
   2. Every field is checked for type, length and format.
   3. Database access uses prepared statements only (no SQL injection).
   4. Same-origin only, small body limit, JSON only.
   5. Spam: hidden honeypot, optional Cloudflare Turnstile, and a per-visitor
      order limit (visitors are stored as one-way hashes, never raw IPs).
   6. Errors are generic. Details go to `wrangler tail`, never to the visitor.
   ===================================================================== */
import { PKGS, CUSTOM_PKG, ADDONS, PAYMENT } from "../public/settings.js";

const MAX_BODY_BYTES = 8 * 1024;
const MAX_PER_HOUR = 5;
const MAX_PER_DAY = 15;
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // no 0/O/1/I to avoid read-aloud mistakes

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'"
};
const reply = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...extra } });
const fail = (status, error, extra) => reply({ ok: false, error }, status, extra);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/order") return handleOrder(request, env, ctx, url);
    if (url.pathname.startsWith("/api/")) return fail(404, "Not found");
    return env.ASSETS.fetch(request);
  }
};

/* ---------- helpers ---------- */
const own = (arr, id) => (typeof id === "string" ? arr.find(x => x.id === id) : undefined);

/* single-line text: remove control characters, squeeze spaces. Multi-line (notes) keeps line breaks. */
function cleanLine(v) { return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim() : null; }
function cleanText(v) { return typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/\r\n?/g, "\n").trim() : null; }

async function readJson(request) {
  const type = request.headers.get("Content-Type") || "";
  if (!type.toLowerCase().startsWith("application/json")) return { error: [415, "Unsupported request."] };
  const declared = Number(request.headers.get("Content-Length") || 0);
  if (declared > MAX_BODY_BYTES) return { error: [413, "Request too large."] };
  if (!request.body) return { error: [400, "Empty request."] };
  /* read the stream ourselves so a missing/lying Content-Length cannot make us load a huge body */
  const reader = request.body.getReader(), chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) { reader.cancel().catch(() => {}); return { error: [413, "Request too large."] }; }
    chunks.push(value);
  }
  const all = new Uint8Array(size); let off = 0;
  for (const c of chunks) { all.set(c, off); off += c.byteLength; }
  try {
    const data = JSON.parse(new TextDecoder().decode(all));
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("shape");
    return { data };
  } catch { return { error: [400, "Invalid request."] }; }
}

function makeRef() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return "EC-" + Array.from(bytes, b => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyTurnstile(env, token, ip) {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const out = await r.json();
  return out && out.success === true;
}

/* Optional: email YOU when an order arrives (only if RESEND_API_KEY and OWNER_EMAIL secrets are set). Plain text only. */
async function notifyOwner(env, o) {
  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL) return;
  const text = [
    `New EverCloud order ${o.ref}`, "",
    `Package: ${o.packageLabel}`, o.addons.length ? `Add-ons: ${o.addons.join(", ")}` : "",
    `Due today: ${o.dueToday}   Monthly: ${o.monthly}   Payment: ${o.pay || "-"}`, "",
    `Name: ${o.name}`, `Email: ${o.email}`, `Phone: ${o.phone || "-"}`, `Company: ${o.company || "-"}`, `Notes: ${o.notes || "-"}`
  ].filter(l => l !== "").join("\n");
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.MAIL_FROM || "EverCloud <onboarding@resend.dev>", to: [env.OWNER_EMAIL], subject: "New order " + o.ref, text })
    });
  } catch (e) { console.error("notify failed:", e && e.message); }
}

/* ---------- POST /api/order ---------- */
async function handleOrder(request, env, ctx, url) {
  if (request.method !== "POST") return fail(405, "Method not allowed.", { Allow: "POST" });
  if (request.headers.get("Origin") !== url.origin) return fail(403, "Forbidden.");   // browsers always send Origin on POST

  const parsed = await readJson(request);
  if (parsed.error) return fail(...parsed.error);
  const b = parsed.data;

  /* honeypot: a human never fills the hidden field. Pretend success so bots learn nothing. */
  if (typeof b.hp === "string" && b.hp.trim() !== "") return reply({ ok: true, ref: makeRef() });

  /* --- the choices --- */
  const pkg = b.pkg === "custom" ? CUSTOM_PKG : own(PKGS, b.pkg);
  if (!pkg) return fail(400, "Please choose a package.");

  let addonIds = [];
  if (!pkg.custom) {
    if (!Array.isArray(b.addons) || b.addons.length > ADDONS.length) return fail(400, "Invalid add-ons.");
    addonIds = [...new Set(b.addons)];
    if (!addonIds.every(id => own(ADDONS, id))) return fail(400, "Invalid add-ons.");
  }
  const adds = ADDONS.filter(a => addonIds.includes(a.id));

  let pay = "";
  if (!pkg.custom) {
    pay = typeof b.pay === "string" ? b.pay : "";
    if (!PAYMENT.methods.some(m => m.id === pay)) return fail(400, "Please choose how you would like to pay.");
  }
  if (b.agree !== true) return fail(400, "Please confirm your order to continue.");

  /* --- the person --- */
  const name = cleanLine(b.name), email = cleanLine(b.email), phone = cleanLine(b.phone ?? ""), company = cleanLine(b.company ?? ""), notes = cleanText(b.notes ?? "");
  if (name === null || !name || name.length > 100) return fail(400, "Please enter your name.");
  if (email === null || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, "Please enter a valid email address.");
  if (phone === null || phone.length > 30 || (phone && !/^\+?[\d\s().-]{6,30}$/.test(phone))) return fail(400, "Please enter a valid phone number.");
  if (company === null || company.length > 150) return fail(400, "Company name is too long.");
  if (notes === null || notes.length > 2000) return fail(400, "Notes are too long (2000 characters at most).");

  /* --- spam checks --- */
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (env.TURNSTILE_SECRET) {
    let human = false;
    try { human = await verifyTurnstile(env, b.token, ip); }
    catch (e) { console.error("turnstile error:", e && e.message); return fail(503, "Security check unavailable. Please try again."); }
    if (!human) return fail(403, "Security check failed.");
  }
  const ipHash = await sha256Hex((env.IP_SALT || "evercloud") + "|" + ip);
  const now = Math.floor(Date.now() / 1000);

  try {
    const usage = await env.DB
      .prepare("SELECT COALESCE(SUM(created_at > ?1), 0) AS hour, COUNT(*) AS day FROM orders WHERE ip_hash = ?2 AND created_at > ?3")
      .bind(now - 3600, ipHash, now - 86400).first();
    if (usage && (usage.hour >= MAX_PER_HOUR || usage.day >= MAX_PER_DAY)) return fail(429, "Too many orders. Please try again later.", { "Retry-After": "3600" });

    /* --- price: calculated HERE, from settings.js --- */
    const setup = (pkg.setup || 0) + adds.reduce((s, a) => s + (a.setup || 0), 0);
    const monthly = (pkg.monthly || 0) + adds.reduce((s, a) => s + (a.monthly || 0), 0);
    const dueToday = pkg.custom ? 0 : setup + monthly;
    const packageLabel = pkg.custom ? "Custom quote" : pkg.svc === "bundle" ? pkg.name + " bundle" : pkg.svc.toUpperCase() + " " + pkg.name;

    for (let attempt = 0; attempt < 3; attempt++) {
      const ref = makeRef();
      try {
        await env.DB.prepare(
          "INSERT INTO orders (ref, created_at, package_id, package, addons, due_today, monthly, pay_method, name, email, phone, company, notes, ip_hash) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14)"
        ).bind(ref, now, pkg.id, packageLabel, JSON.stringify(addonIds), dueToday, monthly, pay, name, email, phone, company, notes, ipHash).run();
        ctx.waitUntil(notifyOwner(env, { ref, packageLabel, addons: adds.map(a => a.name), dueToday, monthly, pay, name, email, phone, company, notes }));
        return reply({ ok: true, ref, dueToday, monthly });
      } catch (e) {
        if (!/UNIQUE/i.test(String(e && e.message))) throw e;   // only a ref collision is worth retrying
      }
    }
    throw new Error("could not create a unique ref");
  } catch (e) {
    console.error("order failed:", e && e.message);             // visible with `npx wrangler tail`; contains no customer data
    return fail(500, "Something went wrong on our side. Please try again.");
  }
}
