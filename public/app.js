/* =====================================================================
   EverCloud front end (ES module). Prices, contact details and payment links
   live in settings.js so the website and the order API always agree.
   ===================================================================== */
import { CURRENCY, CONTACT, PAYMENT, SHOW_SAMPLE_NOTE, TURNSTILE_SITEKEY, PKGS, CUSTOM_PKG, ADDONS } from "./settings.js";

/* ---------- Content: services (hierarchy) ---------- */
const SERVICES = [
  { id:"web", name:"Website Development", short:"Fast · Modern · Scalable",
    blurb:"Fast, modern sites that are easy to grow. Every site is built mobile-first and ready to handle more visitors as you grow.",
    children:[
      { id:"web-biz", name:"Business websites", blurb:"A clear, fast site that explains what you do and makes it easy to get in touch.",
        includes:["Page structure and copy outline","Mobile-first design and build","Contact forms, maps and analytics set-up"], time:"3–5 weeks" },
      { id:"web-shop", name:"E-commerce stores", blurb:"An online shop with product pages, a simple checkout and the payment options your customers use.",
        includes:["Product catalogue and search","Cart, checkout and payment set-up","Order emails and basic reporting"], time:"5–8 weeks" },
      { id:"web-app", name:"Web apps & portals", blurb:"Custom tools such as booking systems, client portals and dashboards.",
        includes:["Scoping workshop and prototype","Secure login and user roles","Admin area and handover training"], time:"8–14 weeks" }
    ]},
  { id:"seo", name:"SEO", short:"Higher Rankings · More Traffic",
    blurb:"Be found by the people who are already searching for what you offer.",
    children:[
      { id:"seo-tech", name:"Technical SEO fixes", blurb:"Find and fix what stops search engines from reading your site properly.",
        includes:["Site crawl and speed audit","Fixes for indexing, links and mobile issues","A priority list with clear next steps"], time:"2–4 weeks" },
      { id:"seo-content", name:"Content & keywords", blurb:"Plan pages and articles around what your customers actually search for.",
        includes:["Keyword and competitor research","Page and article plan","On-page work on your key pages"], time:"Ongoing, monthly" },
      { id:"seo-local", name:"Local SEO", blurb:"Show up in map results and “near me” searches.",
        includes:["Business profile set-up and clean-up","Consistent listings across directories","A simple review request flow"], time:"2–3 weeks to set up" }
    ]},
  { id:"mkt", name:"Digital Marketing", short:"More Leads · More Sales",
    blurb:"Reach the right people and turn their attention into enquiries and sales.",
    children:[
      { id:"mkt-ads", name:"Paid ads", blurb:"Google and Meta campaigns built around a cost per lead you set.",
        includes:["Audience and offer planning","Ad creative and landing page advice","Weekly tuning and a monthly report"], time:"Launch in 1–2 weeks" },
      { id:"mkt-social", name:"Social media", blurb:"A steady content calendar that fits your brand.",
        includes:["Monthly content calendar","Posts, graphics and short video","Community replies and reporting"], time:"Ongoing, monthly" },
      { id:"mkt-email", name:"Email & funnels", blurb:"Automatic emails that follow up with every new lead or customer.",
        includes:["Welcome and follow-up sequences","Lead capture forms and pages","Tracking from first click to sale"], time:"2–4 weeks to set up" }
    ]},
  { id:"crm", name:"Client Handling", short:"Stronger Relationships · Longer Growth",
    blurb:"A named contact and a clear rhythm, so you always know where your project stands.",
    children:[
      { id:"crm-onboard", name:"Onboarding", blurb:"A smooth start, with everything agreed before work begins.",
        includes:["Kick-off call and goals sheet","Shared timeline and approvals list","One channel for all questions"], time:"First week" },
      { id:"crm-report", name:"Reporting & reviews", blurb:"Plain-language reports on what we did and what it changed.",
        includes:["Monthly report with the key numbers","Review call with next steps","Goal tracking dashboard"], time:"Monthly" },
      { id:"crm-support", name:"Support & retention", blurb:"Care after launch, so your results keep growing.",
        includes:["Priority support line","Regular site and campaign check-ups","Quarterly planning sessions"], time:"Ongoing" }
    ]},
  { id:"ai", name:"AI Powered Solutions", short:"Smarter Work · Bigger Possibilities",
    blurb:"Practical AI that saves your team time and helps customers get answers faster.",
    children:[
      { id:"ai-chat", name:"Chatbots & support", blurb:"Answer common questions instantly on your site or messaging apps.",
        includes:["A chatbot trained on your own content","Hand-off to a person when needed","Conversation reports"], time:"3–5 weeks" },
      { id:"ai-auto", name:"Workflow automation", blurb:"Replace repeat tasks like data entry, invoices and follow-ups.",
        includes:["Process review to find time-wasters","Automations between your existing tools","Testing and team training"], time:"2–6 weeks" },
      { id:"ai-tools", name:"Content & analytics tools", blurb:"AI tools that draft, summarise and report using your own data.",
        includes:["Drafting and summarising helpers","Dashboards that explain the numbers","A review step so a person approves the output"], time:"4–8 weeks" }
    ]}
];

/* ---------- Content: work library (database) ---------- */
const WORK = [
  { id:"w1", type:"project", svc:"web", title:"Boutique fashion store relaunch", industry:"Retail", year:2026, tags:["E-commerce","Mobile-first"],
    summary:"A new online shop with faster product pages and a simpler checkout.", more:"Rebuilt the catalogue, redesigned the product page and set up the local payment options customers asked for." },
  { id:"w2", type:"project", svc:"web", title:"Dental clinic booking site", industry:"Healthcare", year:2026, tags:["Booking","Business website"],
    summary:"A clear site with online appointment requests and a guide to every treatment.", more:"Reorganised the site around treatments and added an appointment form that emails the front desk." },
  { id:"w3", type:"project", svc:"web", title:"Coaching centre admissions portal", industry:"Education", year:2025, tags:["Web app","Portal"],
    summary:"A portal where families apply, upload documents and track their status.", more:"Built the application flow, secure login and an admin view for the admissions team." },
  { id:"w4", type:"project", svc:"seo", title:"Local search rebuild for a furniture workshop", industry:"Retail", year:2026, tags:["Local SEO","Listings"],
    summary:"Cleaned-up listings and category pages written around local searches.", more:"Merged duplicate listings, wrote new category pages and set up a review request flow." },
  { id:"w5", type:"project", svc:"seo", title:"Listing clean-up for a restaurant group", industry:"Food & hospitality", year:2025, tags:["Local SEO","Reviews"],
    summary:"One consistent name, address and menu link across every branch listing.", more:"Audited each branch, fixed mismatched details and added a simple way to collect new reviews." },
  { id:"w6", type:"project", svc:"seo", title:"Technical audit for a property listings site", industry:"Real estate", year:2025, tags:["Technical SEO","Speed"],
    summary:"A prioritised fix list for slow pages and thousands of near-duplicate listings.", more:"Crawled the site, grouped the issues by impact and handed the developers a ranked list." },
  { id:"w7", type:"project", svc:"mkt", title:"Launch campaign for a skincare brand", industry:"Beauty", year:2026, tags:["Paid ads","Social"],
    summary:"Ads, social posts and a launch page that told one story from first view to purchase.", more:"Planned the offer, produced the creative and tuned the campaign each week after launch." },
  { id:"w8", type:"project", svc:"mkt", title:"Lead-generation ads for a language school", industry:"Education", year:2026, tags:["Paid ads","Landing page"],
    summary:"Targeted ads that send students to a short trial-class sign-up page.", more:"Tested three audiences and two offers, then moved the budget to what brought in enquiries." },
  { id:"w9", type:"project", svc:"mkt", title:"Welcome emails for an online store", industry:"Retail", year:2025, tags:["Email","Automation"],
    summary:"A four-email welcome series that starts when a visitor joins the list.", more:"Wrote the sequence, set the timing and connected it to the store so buyers leave the series." },
  { id:"w10", type:"project", svc:"crm", title:"Monthly reporting rhythm for a retail client", industry:"Retail", year:2026, tags:["Reporting","Reviews"],
    summary:"One page each month showing what was done, what moved and what is next.", more:"Agreed the goals in week one, then used the same report layout each month so changes were easy to see." },
  { id:"w11", type:"project", svc:"ai", title:"Support chatbot for a travel agency", industry:"Travel", year:2026, tags:["Chatbot","Support"],
    summary:"A chatbot that answers visa, booking and payment questions at any hour.", more:"Trained it on the agency’s own guides and set it to hand tricky questions to a staff member." },
  { id:"w12", type:"project", svc:"ai", title:"Order and invoice automation for a trading firm", industry:"Logistics", year:2025, tags:["Automation","Workflows"],
    summary:"Orders from email now turn into invoices without anyone retyping them.", more:"Mapped the steps, connected the firm’s tools and trained the team to check exceptions." },
  { id:"i1", type:"insight", svc:"web", title:"Business site or online shop: how to choose", industry:"Guide", year:2026, tags:["Planning","Websites"],
    summary:"Three questions that decide which one you need first.", more:"Covers what you sell, how people pay and how much you can manage in the first six months." },
  { id:"i2", type:"insight", svc:"seo", title:"Five SEO fixes to make before you pay for ads", industry:"Guide", year:2026, tags:["Technical SEO","Ads"],
    summary:"Simple site fixes that make every ad click worth more.", more:"Looks at page speed, titles, mobile layout, broken links and tracking." },
  { id:"i3", type:"insight", svc:"crm", title:"What a good monthly marketing report shows", industry:"Guide", year:2026, tags:["Reporting"],
    summary:"The short list of numbers worth reading, and the ones to skip.", more:"Explains how to tie each number to a goal and what to ask your agency when it drops." },
  { id:"i4", type:"insight", svc:"ai", title:"Where a chatbot helps and where it does not", industry:"Guide", year:2025, tags:["Chatbot","Planning"],
    summary:"A quick test for whether your customers’ questions suit a bot.", more:"Lists the question types a bot handles well and the ones that need a person." },
  { id:"i5", type:"insight", svc:"mkt", title:"How to set a cost-per-lead target", industry:"Guide", year:2025, tags:["Paid ads","Budgeting"],
    summary:"Work backwards from what a customer is worth to what a lead can cost.", more:"Walks through a simple calculation using your close rate and average sale." }
];


const TABS = [{ id:"bundle", name:"Bundles", intro:"Several services in one plan, with a single point of contact. A good place to start if you are not sure." }]
  .concat(SERVICES.map(s => ({ id:s.id, name:s.name, intro:s.blurb })));
const SHORT = { bundle:"Bundle", web:"Website", seo:"SEO", mkt:"Marketing", crm:"Client care", ai:"AI" };
const INTENTS = [
  { tab:"web", text:"Launch a website" }, { tab:"seo", text:"Get found on Google" }, { tab:"mkt", text:"Get more leads and sales" },
  { tab:"ai", text:"Save time with AI" }, { tab:"crm", text:"Keep clients longer" }
];
const CO_STEPS = ["Plan","Your details","Payment","Done"];
const FAQ = [
  ["How does pricing work?", "Each package has a one-time setup fee, a monthly fee, or both. Today you pay the setup fee plus the first month. Ad budgets, where they apply, are paid to the ad platform and are not part of our fee."],
  ["How do I pay?", "Choose card, bKash, Nagad or bank transfer at checkout. Payment happens on your provider’s own secure page. We never ask for card numbers on this site."],
  ["Can I change my package later?", "Yes. You can move to a higher or lower tier, and the change applies from the next billing month."],
  ["What do you need from me to start?", "Your logo, brand colours, any text or photos you already have, and access to the accounts we will work in. We list everything on the kick-off call."],
  ["What if nothing fits?", "Choose “Request a custom quote” on the Packages page. Tell us what you need and we reply with scope and price. You pay nothing until you agree."]
];

/* =====================================================================
   HELPERS
   ===================================================================== */
const ICONS = {
  web:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  seo:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M7.5 12.5l2.5-2.5 2 1.5 2.5-3"/>',
  mkt:'<path d="M3 10v4h3l7 4V6L6 10H3z"/><path d="M16 9.5a3.5 3.5 0 010 5M18.5 7a7 7 0 010 10"/>',
  crm:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 2 4.5 4.5"/>',
  ai:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M9.5 15l2.5-6 2.5 6M10.4 13h3.2"/>',
  bundle:'<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'
};
const ico = (k, s = 24) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;
const MARK = `<svg class="mark" viewBox="0 0 120 120" aria-hidden="true">
  <path d="M90 94H36C13 94 8 64 30 58C28 33 56 21 70 38C78 33 90 36 92 48" fill="none" stroke="url(#g-cloud)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M101 60C108 74 102 94 90 94" fill="none" stroke="url(#g-cloud)" stroke-width="9" stroke-linecap="round"/>
  <path d="M46 46H82L76 55H55V60H74L69 68H55V75H78L72 84H46Z" fill="url(#g-silver)"/>
  <path d="M34 90C56 86 76 72 88 46" fill="none" stroke="url(#g-arrow)" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 23L95.8 48.5L80.2 39.5Z" fill="url(#g-arrow)"/>
  <path d="M110 4L112 10L118 12L112 14L110 20L108 14L102 12L108 10Z" fill="var(--accent)"/>
</svg>`;
const fmt = n => CURRENCY + Number(n).toLocaleString("en-US");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const $ = (s, r = document) => r.querySelector(s);
const svcOf = id => SERVICES.find(s => s.id === id);
const pkgById = id => id === "custom" ? CUSTOM_PKG : PKGS.find(p => p.id === id);
const pkgLabel = p => p.custom ? "Custom quote" : p.svc === "bundle" ? p.name + " bundle" : SHORT[p.svc] + " · " + p.name;
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
/* only real https links are ever put into an href */
const safeHref = u => (typeof u === "string" && /^https:\/\/[^\s"'<>]+$/i.test(u)) ? u : "";
const LIVE = Object.values(PAYMENT.links).some(safeHref);
function payNoteHTML(m, t) {
  if (!m) return "";
  return safeHref(PAYMENT.links[m.id])
    ? `You will complete payment for <strong>${fmt(t.today)}</strong> with ${m.name} on the provider’s secure page.`
    : `We will email you an invoice for <strong>${fmt(t.today)}</strong> with ${m.name} payment instructions.`;
}

const state = {
  view: "home", svc: null, sub: null, tab: "bundle",
  work: { q: "", type: "all", svc: "all", sort: "new" },
  co: { pkg: null, addons: [], step: 0, d: { name:"", email:"", phone:"", company:"", notes:"", hp:"" }, pay: "", agree: false, errors: {}, order: null, busy: false, formError: "", token: "" }
};
function saveCart() { try { localStorage.setItem("ec_cart", JSON.stringify({ pkg: state.co.pkg, addons: state.co.addons })); } catch (e) {} }
function loadCart() {
  try {
    const s = JSON.parse(localStorage.getItem("ec_cart") || "{}");
    if (typeof s.pkg === "string" && pkgById(s.pkg)) state.co.pkg = s.pkg;
    state.co.addons = (Array.isArray(s.addons) ? s.addons : []).filter(id => ADDONS.some(a => a.id === id));
  } catch (e) {}
}
function totals() {
  const co = state.co, p = pkgById(co.pkg);
  if (!p) return null;
  let setup = p.setup || 0, monthly = p.monthly || 0;
  const adds = ADDONS.filter(a => co.addons.includes(a.id));
  adds.forEach(a => { setup += a.setup || 0; monthly += a.monthly || 0; });
  return { p, adds, setup, monthly, today: setup + monthly, custom: !!p.custom };
}
function priceNote(p) {
  if (p.custom) return "";
  if (p.monthly && p.setup) return `+ ${fmt(p.setup)} one-time setup`;
  if (p.monthly) return "No setup fee";
  return "One-time payment";
}
function pkgCard(p, cta) {
  return `<article class="pkg ${p.rec ? "rec" : ""}">
    ${p.rec ? `<span class="ribbon">Recommended</span>` : ""}
    <div><h3>${p.name}</h3><p class="for">${p.for}</p></div>
    <div class="price"><strong>${fmt(p.monthly || p.setup)}</strong><span>${p.monthly ? "per month" : "one-time"}</span></div>
    <p class="price-note">${priceNote(p)}${p.note ? " · " + p.note : ""}</p>
    <ul class="incl">${p.items.map(i => `<li>${i}</li>`).join("")}</ul>
    <div class="time">${p.time}</div>
    <button type="button" class="btn ${p.rec ? "btn-primary" : ""}" data-act="choose" data-id="${p.id}">${cta || "Choose " + p.name}</button>
  </article>`;
}
function trustList() {
  return `<ul class="trust"><li>Fixed scope in writing</li><li>Card, bKash, Nagad or bank transfer</li><li>One named contact</li></ul>`;
}
function sampleNote() {
  return SHOW_SAMPLE_NOTE ? `<p class="note" style="margin-top:24px">Prices, timelines and entries on this site are samples. Replace them with your real offers before launch.</p>` : "";
}

/* =====================================================================
   ROUTING
   ===================================================================== */
const VIEWS = { home: renderHome, packages: renderPackages, services: renderServices, work: renderWork, checkout: renderCheckout, help: renderHelp, sitemap: renderSitemap };
const TITLES = {
  home: "EverCloud | Your Digital Growth Partner", packages: "Packages and prices | EverCloud", services: "Services | EverCloud",
  work: "Work and insights | EverCloud", checkout: "Checkout | EverCloud", help: "Help and FAQ | EverCloud", sitemap: "Site map | EverCloud"
};
/* has() stops "#constructor" or "#__proto__" in the address bar from breaking the page */
const routeFromHash = () => { const v = location.hash.slice(1); return has(VIEWS, v) ? v : "home"; };

function go(v) {
  if (!has(VIEWS, v)) v = "home";
  if (location.hash.slice(1) !== v) { try { history.pushState(null, "", "#" + v); } catch (e) {} }   // pushState = the Back button works
  show(v);
}
function show(v) {
  const changed = state.view !== v;
  state.view = v;
  closeMega();
  render();
  if (changed) { window.scrollTo(0, 0); focusMain(); }
}
function focusMain() { const h = $("#view h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
function render() {
  VIEWS[state.view]();
  document.title = TITLES[state.view];
  document.querySelectorAll("[data-view]").forEach(a => {
    if (a.dataset.view === state.view) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  updatePill();
}
window.addEventListener("popstate", () => show(routeFromHash()));
window.addEventListener("hashchange", () => { const v = routeFromHash(); if (v !== state.view) show(v); });
function updatePill() {
  const t = totals(), pill = $("#planPill"), head = $("#head");
  head.classList.toggle("in-checkout", state.view === "checkout");
  if (!t || state.co.order || state.view === "checkout") { pill.hidden = true; head.classList.remove("has-plan"); return; }
  pill.hidden = false; head.classList.add("has-plan");
  pill.innerHTML = `<span class="dot"></span><span class="long">Your plan:</span><strong>${esc(t.p.custom ? "Custom" : t.p.name)}</strong><span class="amt">${t.custom ? "Quote" : fmt(t.today)}</span>`;
}

/* mega menu (hierarchy) */
function buildMega() {
  $("#megaGrid").innerHTML = SERVICES.map(s => `
    <div class="mega-col">
      <button class="mega-head" type="button" data-act="svc" data-id="${s.id}">${ico(s.id, 20)}<span>${s.name}</span></button>
      <ul>${s.children.map(c => `<li><button type="button" data-act="sub" data-svc="${s.id}" data-id="${c.id}">${c.name}</button></li>`).join("")}</ul>
    </div>`).join("");
}
function closeMega() { $("#mega").hidden = true; $("#svcBtn").setAttribute("aria-expanded", "false"); }
function toggleMega() { const m = $("#mega"); const open = m.hidden; m.hidden = !open; $("#svcBtn").setAttribute("aria-expanded", String(open)); }

/* =====================================================================
   VIEWS
   ===================================================================== */
function workCard(w) {
  const s = svcOf(w.svc);
  return `<article class="card work">
    <div class="work-top"><span class="badge ${w.type}">${w.type === "project" ? "Sample project" : "Insight"}</span><span class="work-svc">${ico(w.svc, 16)} ${s.name}</span></div>
    <h3>${esc(w.title)}</h3>
    <p class="muted">${esc(w.summary)}</p>
    <ul class="tags">${w.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <details><summary>${w.type === "project" ? "What we did" : "What it covers"}</summary><p>${esc(w.more)}</p></details>
    <div class="work-meta">${esc(w.industry)} · ${w.year}</div>
  </article>`;
}


/* ----- Home ----- */
function renderHome() {
  const bundles = PKGS.filter(p => p.svc === "bundle");
  const featured = ["w1", "w4", "w11"].map(id => WORK.find(w => w.id === id));
  $("#view").innerHTML = `
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Your digital growth partner</span>
        <h1>Grow online with one team and one clear plan.</h1>
        <p class="lead">Websites, search, ads, client care and AI, sold as packages with clear prices. Choose what you need and check out in a few minutes.</p>
        <div class="intent-wrap">
          <div class="label">Start here: what do you want to do first?</div>
          <div class="intent">${INTENTS.map(i => `<button type="button" data-act="intent" data-id="${i.tab}">${ico(i.tab, 22)}<span>${i.text}</span></button>`).join("")}</div>
          <button class="link-btn" type="button" data-act="intent" data-id="bundle">Not sure? Compare our bundles</button>
        </div>
      </div>
      <div class="hero-mark">${MARK}</div>
    </div>
  </section>
  <div class="trust-bar"><div class="wrap">${trustList()}</div></div>

  <section class="section">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">How it works</span><h2>From first click to kick-off in four steps</h2></div>
      <ol class="journey">
        <li class="j-step"><span class="n">STEP 1</span><h3>Choose a package</h3><p class="muted">Pick a goal above or browse the tiers. Prices are on the page.</p></li>
        <li class="j-step"><span class="n">STEP 2</span><h3>Add your details</h3><p class="muted">Your name, email and anything we should know.</p></li>
        <li class="j-step"><span class="n">STEP 3</span><h3>Pay securely</h3><p class="muted">Card, mobile banking or bank transfer on your provider’s own page.</p></li>
        <li class="j-step"><span class="n">STEP 4</span><h3>We kick off</h3><p class="muted">A named contact books your first call and starts the work.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="row">
        <div class="section-head" style="margin:0"><span class="eyebrow">Popular starting points</span><h2>Our three bundles</h2></div>
        <button class="link-btn" type="button" data-act="intent" data-id="bundle">See every package</button>
      </div>
      <div class="pkgs">${bundles.map(p => pkgCard(p)).join("")}</div>
      ${sampleNote()}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="row">
        <div class="section-head" style="margin:0"><span class="eyebrow">Recent work</span><h2>What we build and run</h2></div>
        <button class="link-btn" type="button" data-go="work">Browse all work</button>
      </div>
      <div class="grid">${featured.map(workCard).join("")}</div>
    </div>
  </section>

  <section class="cta-band">
    <div class="wrap cta-inner">
      <h2>Ready to pick a package?</h2>
      <a class="btn btn-primary" href="#packages" data-go="packages">See packages and prices</a>
    </div>
  </section>`;
}

/* ----- Packages ----- */
function renderPackages() {
  const tab = TABS.find(t => t.id === state.tab) || TABS[0];
  const list = PKGS.filter(p => p.svc === tab.id);
  $("#view").innerHTML = `
  <div class="wrap">
    <div class="page-head"><span class="eyebrow">Packages</span><h1>Pick a package</h1><p class="muted">Clear prices. Setup is paid once, monthly fees only where a service runs every month.</p></div>
    <div class="tabs" role="tablist" aria-label="Package type">
      ${TABS.map(t => `<button type="button" role="tab" class="tab" id="tab-${t.id}" aria-controls="tabpanel" tabindex="${t.id === tab.id ? 0 : -1}" aria-selected="${t.id === tab.id}" data-act="tab" data-id="${t.id}">${ico(t.id, 18)}${t.id === "bundle" ? "Bundles" : SHORT[t.id]}</button>`).join("")}
    </div>
    <div role="tabpanel" id="tabpanel" aria-labelledby="tab-${tab.id}">
      <p class="tab-intro muted">${tab.intro}</p>
      <div class="pkgs">${list.map(p => pkgCard(p)).join("")}</div>
    </div>
    <div class="custom-box">
      <p><strong>Need something else?</strong> <span class="muted">Tell us what you need and we reply with scope and price. You pay nothing until you agree.</span></p>
      <button type="button" class="btn" data-act="choose" data-id="custom">Request a custom quote</button>
    </div>
    <div style="margin-top:28px">${trustList()}</div>
    ${sampleNote()}
    <div style="height:clamp(40px,7vw,80px)"></div>
  </div>`;
}

/* ----- Help ----- */
function renderHelp() {
  const c = CONTACT;
  const contact = [c.email && `Email: <strong>${esc(c.email)}</strong>`, c.phone && `Phone: <strong>${esc(c.phone)}</strong>`, c.whatsapp && `WhatsApp: <strong>${esc(c.whatsapp)}</strong>`].filter(Boolean).join(" · ");
  $("#view").innerHTML = `
  <div class="wrap">
    <div class="page-head"><span class="eyebrow">Help</span><h1>Questions before you buy</h1></div>
    <div class="faq">${FAQ.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</div>
    <div class="custom-box" style="max-width:780px;margin-bottom:clamp(40px,7vw,80px)">
      <p><strong>Still unsure?</strong> <span class="muted">${contact || "Tell us what you need and we will reply with scope and price."}</span></p>
      <button type="button" class="btn btn-primary" data-act="choose" data-id="custom">Request a custom quote</button>
    </div>
  </div>`;
}

/* ----- Checkout (sequence) ----- */
function summaryHTML(t, open) {
  const lines = [];
  lines.push(`<div class="sum-line"><strong>${esc(pkgLabel(t.p))}</strong><span></span></div>`);
  if (t.custom) {
    lines.push(`<p class="sum-later">We will review your request and send a quote. Nothing is charged now.</p>`);
  } else {
    if (t.p.setup) lines.push(`<div class="sum-line"><span>Setup (one-time)</span><span>${fmt(t.p.setup)}</span></div>`);
    if (t.p.monthly) lines.push(`<div class="sum-line"><span>Monthly fee</span><span>${fmt(t.p.monthly)}</span></div>`);
    t.adds.forEach(a => lines.push(`<div class="sum-line"><span>${esc(a.name)}</span><span>${fmt(a.setup || a.monthly)}${a.monthly ? "/mo" : ""}</span></div>`));
    lines.push(`<div class="sum-line sum-total"><span>Due today</span><span>${fmt(t.today)}</span></div>`);
    if (t.monthly) lines.push(`<p class="sum-later">Then ${fmt(t.monthly)} each month.</p>`);
  }
  return `<details id="sum" ${open ? "open" : ""}><summary><span>Order summary</span><span class="due">${t.custom ? "Quote" : fmt(t.today) + " today"}</span></summary><div class="sum-body">${lines.join("")}</div></details>`;
}
function refreshSummary() {
  const t = totals(), box = $("#sumBox");
  if (!t || !box) return;
  box.innerHTML = summaryHTML(t, $("#sum") ? $("#sum").open : innerWidth >= 920);
}
const errMsg = (e, k) => e[k] ? `<p class="err" role="alert" id="err-${k}">${e[k]}</p>` : "";
function validateCo(step) {
  const co = state.co, e = {};
  if (step === 1) {
    if (!co.d.name.trim()) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(co.d.email.trim()) || co.d.email.trim().length > 254) e.email = "Enter an email address like name@company.com.";
    if (co.d.phone.trim() && !/^\+?[\d\s().-]{6,30}$/.test(co.d.phone.trim())) e.phone = "Use digits only, like +880 1XXX XXXXXX.";
  }
  if (step === 2) {
    const t = totals();
    if (!t.custom && !co.pay) e.pay = "Choose how you would like to pay.";
    if (!co.agree) e.agree = "Please confirm to continue.";
  }
  return e;
}
function orderText() {
  const co = state.co, t = totals(), d = co.d;
  const m = PAYMENT.methods.find(x => x.id === co.pay);
  const lines = ["EverCloud order " + (co.order ? co.order.ref : ""), "",
    "Package: " + pkgLabel(t.p)];
  if (t.adds.length) lines.push("Add-ons: " + t.adds.map(a => a.name).join(", "));
  if (!t.custom) { lines.push("Due today: " + fmt(t.today)); if (t.monthly) lines.push("Then monthly: " + fmt(t.monthly)); lines.push("Payment method: " + (m ? m.name : "")); }
  lines.push("", "Name: " + d.name.trim(), "Email: " + d.email.trim(), "Phone: " + (d.phone.trim() || "Not given"), "Company or website: " + (d.company.trim() || "Not given"), "Notes: " + (d.notes.trim() || "None"));
  return lines.join("\n");
}
function coMain(step, t, e) {
  const co = state.co, p = t.p, d = co.d;
  if (step === 0) return `
    <h2 id="coTitle" tabindex="-1">Your package</h2>
    <div class="chosen">
      <div><span class="badge">${esc(pkgLabel(p))}</span><h3 style="margin-top:10px">${esc(p.name)}</h3><p class="muted" style="margin-top:4px">${esc(p.for)}</p></div>
      <div class="price" style="align-self:start">${t.custom ? `<strong>Quote</strong>` : `<strong>${fmt(p.monthly || p.setup)}</strong><span>${p.monthly ? "per month" : "one-time"}</span>`}</div>
      <ul class="incl" style="grid-column:1/-1">${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <button type="button" class="link-btn" style="grid-column:1/-1;justify-self:start" data-act="change-pkg">Change package</button>
    </div>
    ${t.custom ? "" : `<fieldset><legend>Optional add-ons</legend>
      <div class="opts">${ADDONS.map(a => `<label class="opt"><input type="checkbox" data-addon value="${a.id}" ${co.addons.includes(a.id) ? "checked" : ""}><span class="t"><strong>${a.name}</strong><small>${a.note}</small></span><span class="amt">+${fmt(a.setup || a.monthly)}${a.monthly ? "/mo" : ""}</span></label>`).join("")}</div>
    </fieldset>`}`;
  if (step === 1) return `
    <h2 id="coTitle" tabindex="-1">Who should we talk to?</h2>
    <div class="form-grid">
      <div class="field"><label for="f-name">Your name</label><input type="text" id="f-name" data-d="name" value="${esc(d.name)}" autocomplete="name" maxlength="100" aria-required="true" ${e.name ? 'aria-invalid="true" aria-describedby="err-name"' : ""}>${errMsg(e, "name")}</div>
      <div class="field"><label for="f-email">Email</label><input type="email" id="f-email" data-d="email" value="${esc(d.email)}" autocomplete="email" inputmode="email" maxlength="254" aria-required="true" ${e.email ? 'aria-invalid="true" aria-describedby="err-email"' : ""}>${errMsg(e, "email")}</div>
      <div class="field"><label for="f-phone">Phone or WhatsApp <small>(optional)</small></label><input type="tel" id="f-phone" data-d="phone" value="${esc(d.phone)}" autocomplete="tel" inputmode="tel" maxlength="30" ${e.phone ? 'aria-invalid="true" aria-describedby="err-phone"' : ""}>${errMsg(e, "phone")}</div>
      <div class="field"><label for="f-company">Company or website <small>(optional)</small></label><input type="text" id="f-company" data-d="company" value="${esc(d.company)}" autocomplete="organization" maxlength="150"></div>
    </div>
    <div class="field"><label for="f-notes">Anything else we should know? <small>(optional)</small></label><textarea id="f-notes" data-d="notes" rows="4" maxlength="2000">${esc(d.notes)}</textarea></div>
    <div class="hp" aria-hidden="true"><label for="f-hp">Leave this field empty</label><input type="text" id="f-hp" data-d="hp" tabindex="-1" autocomplete="off" value="${esc(d.hp)}"></div>`;
  if (step === 2) {
    const m = PAYMENT.methods.find(x => x.id === co.pay);
    return `
    <h2 id="coTitle" tabindex="-1">${t.custom ? "Send your request" : "How would you like to pay?"}</h2>
    ${!LIVE && !t.custom ? `<p class="demo"><strong>No payment on this page.</strong> Place your order and we email you an invoice with payment instructions.</p>` : ""}
    ${t.custom ? `<p class="muted">We will review your request and email you a quote. There is nothing to pay today.</p>` : `
    <fieldset><legend class="muted" style="font-weight:500">Choose one.</legend>
      <div class="opts">${PAYMENT.methods.map(x => `<label class="opt"><input type="radio" name="pay" data-pay value="${x.id}" ${co.pay === x.id ? "checked" : ""}><span class="t"><strong>${x.name}</strong><small>${x.note}</small></span></label>`).join("")}</div>
      ${errMsg(e, "pay")}
    </fieldset>
    <p class="pay-note" id="payNote">${payNoteHTML(m, t)}</p>
    <div class="secure">${ico("lock", 18)}<span>You pay on your payment provider’s own page. This site never asks for card numbers or PINs.</span></div>`}
    <div><label class="check"><input type="checkbox" id="agree" data-agree ${co.agree ? "checked" : ""}><span>I have checked my order and agree to the scope described. I understand the monthly fee, if any, repeats until I cancel.</span></label>${errMsg(e, "agree")}</div>
    ${TURNSTILE_SITEKEY ? `<div class="ts-box" id="tsBox"></div>` : ""}
    <p class="form-error" id="formError" role="alert" ${co.formError ? "" : "hidden"}>${esc(co.formError)}</p>`;
  }
  /* step 3: done */
  const o = co.order, link = !t.custom ? safeHref(PAYMENT.links[co.pay]) : "";
  const m = PAYMENT.methods.find(x => x.id === co.pay);
  const first = esc(co.d.name.trim().split(/\s+/)[0] || "there");
  const c = CONTACT, contact = [c.email, c.phone, c.whatsapp].filter(Boolean).map(esc).join(" · ");
  return `
    <div class="done-head">
      <span class="badge ok">${t.custom ? "Request received" : "Order received"}</span>
      <h2 id="coTitle" tabindex="-1">Thank you, ${first}.</h2>
      <p class="muted">Your reference is <strong style="color:var(--fg)">${o.ref}</strong>. Keep it for any question about this order.</p>
    </div>
    ${!LIVE && !t.custom ? `<p class="demo"><strong>Nothing has been charged.</strong> We will email you an invoice with payment instructions.</p>` : ""}
    <ol class="next">
      ${t.custom ? "" : `<li><div><strong>Pay ${fmt(t.today)} with ${m ? m.name : "your chosen method"}</strong><p class="muted">${link ? `Use the secure payment page below to finish.` : `We will email you an invoice with payment instructions.`}</p>${link ? `<p style="margin-top:12px"><a class="btn btn-primary" href="${esc(link)}" target="_blank" rel="noopener noreferrer">Pay now</a></p>` : ""}</div></li>`}
      <li><div><strong>Kick-off call</strong><p class="muted">We email you to book a call and list what we need from you.</p></div></li>
      <li><div><strong>We build, you approve</strong><p class="muted">You see progress and approve each stage before it goes live.</p></div></li>
    </ol>
    <div id="sendStatus" class="note" role="status">Your ${t.custom ? "request" : "order"} has been saved with us.${contact ? ` Questions? ${contact}.` : ""}</div>
    <pre class="brief" id="briefText">${esc(orderText())}</pre>
    <div class="done-actions"><button type="button" class="btn" data-act="co-copy">Copy order</button><button type="button" class="btn btn-quiet" data-act="co-new">Start another order</button><span class="muted" id="copyMsg" role="status"></span></div>`;
}
function renderCheckout() {
  const co = state.co, t = totals();
  if (!t) {
    $("#view").innerHTML = `<div class="wrap"><div class="empty-co"><span class="eyebrow">Checkout</span><h1>Choose a package first</h1><p class="muted">Your order starts with a package. It takes a few seconds to pick one.</p><button type="button" class="btn btn-primary" data-go="packages">See packages</button></div></div>`;
    return;
  }
  const step = co.order ? 3 : co.step, e = co.errors;
  const last = step === 2;
  const nav = step === 3 ? "" : `<div class="wiz-nav">${step > 0 ? `<button type="button" class="btn" data-act="co-back">Back</button>` : `<span></span>`}<button type="submit" class="btn btn-primary" ${co.busy ? 'disabled aria-disabled="true"' : ""}>${co.busy ? "Sending…" : last ? (t.custom ? "Send request" : "Place order · " + fmt(t.today)) : "Continue"}</button></div>`;
  $("#view").innerHTML = `
  <div class="wrap co-wrap">
    <div class="page-head"><span class="eyebrow">Checkout</span><h1>${step === 3 ? "All done" : "Almost there"}</h1></div>
    <ol class="steps" aria-label="Progress">${CO_STEPS.map((s, i) => {
      const cls = i < step ? "done" : i === step ? "cur" : "";
      const inner = `<span>${i + 1}</span><span>${s}</span>`;
      return `<li class="${cls}" ${i === step ? 'aria-current="step"' : ""}>${i < step && step < 3 ? `<button type="button" data-act="co-step" data-step="${i}">${inner}</button>` : inner}</li>`;
    }).join("")}</ol>
    <div class="co-grid">
      <form class="panel" id="coForm" novalidate>${coMain(step, t, e)}${nav}</form>
      <aside class="summary" id="sumBox" aria-label="Order summary">${summaryHTML(t, innerWidth >= 920)}</aside>
    </div>
  </div>`;
  if (step === 2) mountTurnstile();
}

/* ----- Site map ----- */
function renderSitemap() {
  $("#view").innerHTML = `
  <div class="wrap">
    <div class="page-head"><span class="eyebrow">Site map</span><h1>How this site is organised</h1>
      <p class="muted">One main path leads from the home page to payment. Two side structures help visitors who want to explore first.</p></div>
    <div class="maps">
      <section class="map-card seq">
        <div><span class="eyebrow" style="color:var(--violet)">Main path (sequence)</span><h2 style="font-size:1.2rem;margin-top:8px">Home to payment</h2></div>
        <p class="muted">Every page has one next step. The amber button is always the next step on this path.</p>
        <ol class="seq-list"><li>Home: pick a goal</li><li>Packages: compare tiers and prices</li><li>Checkout: plan and add-ons</li><li>Checkout: your details</li><li>Checkout: payment</li><li>Confirmation and kick-off</li></ol>
        <button type="button" class="link-btn" style="text-align:left" data-go="packages">Open packages</button>
      </section>
      <section class="map-card">
        <div><span class="eyebrow">Hierarchy</span><h2 style="font-size:1.2rem;margin-top:8px">Services</h2></div>
        <p class="muted">For browsing. Five services, each with three offers, reached from the Services menu.</p>
        <ul class="simple">${SERVICES.map(s => `<li>${s.name}<ul>${s.children.map(c => `<li>${c.name}</li>`).join("")}</ul></li>`).join("")}</ul>
        <button type="button" class="link-btn" style="text-align:left" data-go="services">Open services</button>
      </section>
      <section class="map-card db">
        <div><span class="eyebrow" style="color:var(--blue)">Database</span><h2 style="font-size:1.2rem;margin-top:8px">Work and insights</h2></div>
        <p class="muted">For proof. ${WORK.length} entries in one list that visitors search and filter.</p>
        <ul class="simple"><li>Search by any word</li><li>Filter by projects or insights</li><li>Filter by service</li><li>Sort by year or title</li></ul>
        <button type="button" class="link-btn" style="text-align:left" data-go="work">Open work</button>
      </section>
    </div>
    <div class="section-head" style="margin-bottom:16px"><span class="eyebrow">Shortcuts back to the path</span><h2>Every page leads to a package</h2></div>
    <div class="meets">
      <div class="card"><h3>Services to packages</h3><p class="muted">Each service and offer page ends with a button to that service’s package tiers.</p></div>
      <div class="card"><h3>Work to packages</h3><p class="muted">Every project and guide names its service, so a visitor can move from proof to price.</p></div>
      <div class="card"><h3>Any page to your plan</h3><p class="muted">Once a package is chosen, a green “Your plan” button stays in the header and returns to checkout.</p></div>
    </div>
  </div>`;
}

function treeHTML() {
  return `<ul class="tree">` + SERVICES.map(s => {
    const open = state.svc === s.id;
    return `<li>
      <button type="button" class="node ${open && !state.sub ? "is-current" : ""}" data-act="svc" data-id="${s.id}" aria-expanded="${open}">${ico(s.id, 20)}<span>${s.name}</span><i class="chev" aria-hidden="true"></i></button>
      ${open ? `<ul class="sub">${s.children.map(c => `<li><button type="button" class="leaf ${state.sub === c.id ? "is-current" : ""}" data-act="sub" data-svc="${s.id}" data-id="${c.id}">${c.name}</button></li>`).join("")}</ul>` : ""}
    </li>`;
  }).join("") + `</ul>`;
}

function renderServices() {
  const s = svcOf(state.svc);
  const c = s && s.children.find(x => x.id === state.sub);
  let detail = "";
  if (!s) {
    detail = `
      <div class="crumbs"><span>Services</span></div>
      <div><h2>Five services, one team</h2><p class="muted" style="margin-top:8px;max-width:60ch">Choose a service to see what it covers. Each one opens into specific offers you can mix and match.</p></div>
      <div class="grid">${SERVICES.map(x => `<button type="button" class="child-card" data-act="svc" data-id="${x.id}">${ico(x.id, 26)}<h3>${x.name}</h3><p>${x.short}</p><span class="go">See what is inside →</span></button>`).join("")}</div>`;
  } else if (!c) {
    detail = `
      <div class="crumbs"><button type="button" data-act="crumb-root">Services</button><i>›</i><span>${s.name}</span></div>
      <div class="detail-top">${ico(s.id, 34)}<div><h2>${s.name}</h2><p>${s.blurb}</p></div></div>
      <div class="grid">${s.children.map(x => `<button type="button" class="child-card" data-act="sub" data-svc="${s.id}" data-id="${x.id}"><h3>${x.name}</h3><p>${x.blurb}</p><span class="go">Details →</span></button>`).join("")}</div>
      <div class="hero-actions"><button type="button" class="btn btn-primary" data-act="pkg-for" data-id="${s.id}">See ${s.name} packages</button><button type="button" class="btn" data-act="work-for" data-id="${s.id}">See related work</button></div>`;
  } else {
    const related = WORK.filter(w => w.svc === s.id).slice(0, 2);
    detail = `
      <div class="crumbs"><button type="button" data-act="crumb-root">Services</button><i>›</i><button type="button" data-act="crumb-svc">${s.name}</button><i>›</i><span>${c.name}</span></div>
      <div class="detail-top">${ico(s.id, 34)}<div><h2>${c.name}</h2><p>${c.blurb}</p></div></div>
      <div class="facts card" style="flex-direction:row">
        <div style="flex:1 1 240px"><div class="label" style="margin-bottom:12px">What is included</div><ul>${c.includes.map(i => `<li>${i}</li>`).join("")}</ul></div>
        <div style="flex:1 1 200px"><div class="label" style="margin-bottom:12px">Typical timeline</div><p>${c.time}</p><p class="muted" style="margin-top:8px;font-size:.86rem">Final timing depends on your scope and how fast feedback comes in.</p></div>
      </div>
      <div class="hero-actions"><button type="button" class="btn btn-primary" data-act="pkg-for" data-id="${s.id}">See ${s.name} packages</button><button type="button" class="btn" data-act="work-for" data-id="${s.id}">See all ${s.name} work</button></div>
      ${related.length ? `<div><div class="label" style="margin-bottom:14px">Related work</div><div class="grid">${related.map(workCard).join("")}</div></div>` : ""}`;
  }
  $("#view").innerHTML = `
  <div class="wrap">
    <div class="page-head"><span class="eyebrow">Services</span><h1>What we can do for you</h1></div>
    <div class="svc-layout">
      <aside aria-label="Services menu">${treeHTML()}</aside>
      <div class="detail" id="detail">${detail}</div>
    </div>
  </div>`;
}

function filterWork() {
  const { q, type, svc, sort } = state.work;
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = WORK.filter(w =>
    (type === "all" || w.type === type) && (svc === "all" || w.svc === svc) &&
    words.every(x => (w.title + " " + w.summary + " " + w.tags.join(" ") + " " + w.industry + " " + svcOf(w.svc).name).toLowerCase().includes(x)));
  list.sort(sort === "az" ? (a, b) => a.title.localeCompare(b.title) : (a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return list;
}
function renderWork() {
  const w = state.work;
  $("#view").innerHTML = `
  <div class="wrap">
    <div class="page-head"><span class="eyebrow">Work and insights</span><h1>Search our work</h1><p class="muted">Projects and short guides, filed by service, industry and year.</p></div>
    <div class="controls">
      <div class="ctl-row">
        <div class="grow"><label for="workq" class="label" style="display:block;margin-bottom:8px">Search</label><input type="search" id="workq" placeholder="Try “local”, “ads”, “retail” or “chatbot”" value="${esc(w.q)}" autocomplete="off"></div>
        <div><span class="label" style="display:block;margin-bottom:8px">Show</span>
          <div class="seg" role="group" aria-label="Type">
            <button type="button" data-act="wtype" data-v="all">All</button><button type="button" data-act="wtype" data-v="project">Projects</button><button type="button" data-act="wtype" data-v="insight">Insights</button>
          </div></div>
        <div><label for="works" class="label" style="display:block;margin-bottom:8px">Sort</label>
          <select id="works"><option value="new">Newest first</option><option value="az">A to Z</option></select></div>
      </div>
      <div class="chips" role="group" aria-label="Service">
        <button type="button" class="chip" data-act="wsvc" data-v="all">All services</button>
        ${SERVICES.map(s => `<button type="button" class="chip" data-act="wsvc" data-v="${s.id}">${ico(s.id, 16)} ${s.name}</button>`).join("")}
      </div>
    </div>
    <div class="count" id="count" aria-live="polite"></div>
    <div class="grid" id="results" style="padding-bottom:24px"></div>
    <div class="custom-box" style="margin-bottom:24px"><p><strong>Like what you see?</strong> <span class="muted">Every project here started as one of our packages.</span></p><button type="button" class="btn btn-primary" data-go="packages">See packages and prices</button></div>
    ${SHOW_SAMPLE_NOTE ? `<p class="note" style="margin-bottom:clamp(40px,7vw,80px)">These are sample entries that show how the library will look. Replace them with real projects and articles before launch.</p>` : `<div style="height:clamp(40px,7vw,80px)"></div>`}
  </div>`;
  $("#works").value = w.sort;
  updateWork();
}
function updateWork() {
  const w = state.work, list = filterWork();
  document.querySelectorAll('[data-act="wtype"]').forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === w.type)));
  document.querySelectorAll('[data-act="wsvc"]').forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === w.svc)));
  $("#count").textContent = list.length + (list.length === 1 ? " entry" : " entries") + " of " + WORK.length;
  $("#results").innerHTML = list.length ? list.map(workCard).join("") :
    `<div class="empty" style="grid-column:1/-1"><p>No entries match. Try fewer words or clear the filters.</p><button type="button" class="btn" data-act="wclear">Clear filters</button></div>`;
}



/* =====================================================================
   SPAM CHECK (Cloudflare Turnstile, free). Only loads when a site key is set.
   ===================================================================== */
let tsLoading = null, tsWidget = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!tsLoading) tsLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve(window.turnstile);
    s.onerror = () => { tsLoading = null; reject(new Error("turnstile")); };
    document.head.appendChild(s);
  });
  return tsLoading;
}
function mountTurnstile() {
  state.co.token = "";
  if (!TURNSTILE_SITEKEY || !$("#tsBox")) return;
  loadTurnstile().then(ts => {
    if (!ts || !$("#tsBox")) return;                       // visitor already moved on
    tsWidget = ts.render("#tsBox", {
      sitekey: TURNSTILE_SITEKEY, theme: "auto",
      callback: tok => { state.co.token = tok; },
      "expired-callback": () => { state.co.token = ""; },
      "error-callback": () => { state.co.token = ""; }
    });
  }).catch(() => showFormError("The security check could not load. Check your connection and refresh the page."));
}
function resetTurnstile() {
  state.co.token = "";                                     // a token works only once
  try { if (window.turnstile && tsWidget !== null) window.turnstile.reset(tsWidget); } catch (e) {}
}

/* =====================================================================
   ORDER SUBMISSION: sends choices (never prices) to /api/order.
   The server looks up prices itself, so a tampered browser cannot change them.
   ===================================================================== */
function showFormError(msg) {
  state.co.formError = msg;
  const el = $("#formError");
  if (el) { el.textContent = msg; el.hidden = !msg; if (msg) el.scrollIntoView({ block: "center" }); }
}
function setBusy(on) {
  state.co.busy = on;
  const b = $('#coForm button[type="submit"]');
  if (b) { b.disabled = on; if (on) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled"); b.textContent = on ? "Sending…" : (totals().custom ? "Send request" : "Place order · " + fmt(totals().today)); }
}
function friendlyError(err) {
  if (err.name === "AbortError") return "The server took too long to answer. Please try again.";
  if (err.status === 429) return "Too many orders from your connection. Please wait a while and try again, or contact us.";
  if (err.status === 400 && err.message) return err.message;
  if (err.status === 403) return "The security check failed. Please try again.";
  return "We could not send your order. Please check your connection and try again.";
}
async function submitOrder() {
  const co = state.co, t = totals();
  if (co.busy || !t) return;
  if (TURNSTILE_SITEKEY && !co.token) { showFormError("Please complete the security check above, then press the button again."); return; }
  showFormError("");
  setBusy(true);
  const payload = {
    pkg: co.pkg, addons: co.addons, pay: t.custom ? "" : co.pay, agree: co.agree,
    name: co.d.name.trim(), email: co.d.email.trim(), phone: co.d.phone.trim(), company: co.d.company.trim(), notes: co.d.notes.trim(),
    hp: co.d.hp, token: co.token
  };
  const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.ok) throw Object.assign(new Error(data.error || "failed"), { status: r.status });
    co.order = { ref: String(data.ref) };
    co.step = 3; co.busy = false; co.token = ""; co.formError = "";
    try { localStorage.removeItem("ec_cart"); } catch (e) {}
    renderCheckout(); updatePill(); $("#coTitle")?.focus(); window.scrollTo(0, 0);
  } catch (err) {
    resetTurnstile();
    setBusy(false);
    showFormError(friendlyError(err));
  } finally { clearTimeout(timer); }
}

/* =====================================================================
   EVENTS
   ===================================================================== */
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]");
  if (g) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;   // let "open in new tab" work
    e.preventDefault(); go(g.dataset.go); return;
  }
  const a = e.target.closest("[data-act]");
  if (!a) { if (!e.target.closest("#mega")) closeMega(); return; }
  const d = a.dataset, co = state.co;
  switch (d.act) {
    case "toggleMega": toggleMega(); return;
    case "svc": state.svc = d.id; state.sub = null; go("services"); if (innerWidth < 880) $("#detail")?.scrollIntoView({ block: "start" }); return;
    case "sub": state.svc = d.svc; state.sub = d.id; go("services"); if (innerWidth < 880) $("#detail")?.scrollIntoView({ block: "start" }); return;
    case "crumb-root": state.svc = null; state.sub = null; render(); return;
    case "crumb-svc": state.sub = null; render(); return;
    case "pkg-for": case "intent": state.tab = d.id; go("packages"); return;
    case "tab": state.tab = d.id; renderPackages(); return;
    case "choose":
      if (co.pkg !== d.id || co.step === 3) { co.step = 0; co.pay = ""; co.agree = false; co.errors = {}; if (d.id === "custom") co.addons = []; }
      co.pkg = d.id; co.order = null; co.busy = false; co.formError = ""; saveCart(); go("checkout"); return;
    case "change-pkg": { const p = pkgById(co.pkg); state.tab = p && !p.custom ? p.svc : "bundle"; go("packages"); return; }
    case "co-back": co.step = Math.max(0, co.step - 1); co.errors = {}; renderCheckout(); $("#coTitle")?.focus(); window.scrollTo(0, 0); return;
    case "co-step": co.step = Number(d.step); co.errors = {}; renderCheckout(); $("#coTitle")?.focus(); window.scrollTo(0, 0); return;
    case "co-new": co.pkg = null; co.addons = []; co.step = 0; co.pay = ""; co.agree = false; co.order = null; co.errors = {}; co.formError = ""; co.busy = false; saveCart(); go("packages"); return;
    case "co-copy": {
      const msg = $("#copyMsg");
      const fallback = () => { const r = document.createRange(); r.selectNodeContents($("#briefText")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); msg.textContent = "Press Ctrl+C or Cmd+C to copy the selected text."; };
      try { navigator.clipboard.writeText(orderText()).then(() => { msg.textContent = "Copied."; }, fallback); } catch (err) { fallback(); }
      return;
    }
    case "work-for": state.work.svc = d.id; state.work.type = "all"; state.work.q = ""; go("work"); return;
    case "wtype": state.work.type = d.v; updateWork(); return;
    case "wsvc": state.work.svc = d.v; updateWork(); return;
    case "wclear": state.work.q = ""; state.work.type = "all"; state.work.svc = "all"; $("#workq").value = ""; updateWork(); return;
  }
});
document.addEventListener("submit", e => {
  if (e.target.id !== "coForm") return;
  e.preventDefault();
  const co = state.co, t = totals();
  if (!t) return;
  const err = validateCo(co.step);
  co.errors = err;
  if (Object.keys(err).length) {
    renderCheckout();
    const bad = $('[aria-invalid="true"]') || $(".err");
    if (bad) { bad.focus ? bad.focus() : bad.scrollIntoView({ block: "center" }); }
    return;
  }
  if (co.step === 2) { submitOrder(); return; }
  co.step++; renderCheckout(); $("#coTitle")?.focus(); window.scrollTo(0, 0);
});
document.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "workq") { state.work.q = t.value; updateWork(); return; }
  const co = state.co;
  if (t.dataset.d) {
    const k = t.dataset.d;
    co.d[k] = t.value;
    if (co.errors[k]) { delete co.errors[k]; t.removeAttribute("aria-invalid"); t.removeAttribute("aria-describedby"); $("#err-" + k)?.remove(); }
    return;
  }
  if (t.hasAttribute && t.hasAttribute("data-addon")) {
    const set = new Set(co.addons); t.checked ? set.add(t.value) : set.delete(t.value);
    co.addons = ADDONS.map(a => a.id).filter(id => set.has(id));
    saveCart(); refreshSummary(); return;
  }
  if (t.hasAttribute && t.hasAttribute("data-pay")) {
    co.pay = t.value;
    const m = PAYMENT.methods.find(x => x.id === t.value), tt = totals();
    $("#payNote").innerHTML = payNoteHTML(m, tt);
    if (co.errors.pay) { delete co.errors.pay; $("#err-pay")?.remove(); }
    return;
  }
  if (t.hasAttribute && t.hasAttribute("data-agree")) { co.agree = t.checked; if (co.errors.agree) { delete co.errors.agree; $("#err-agree")?.remove(); } return; }
});
document.addEventListener("change", e => { if (e.target.id === "works") { state.work.sort = e.target.value; updateWork(); } });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { if (!$("#mega").hidden) { closeMega(); $("#svcBtn").focus(); } return; }
  /* arrow keys move between the package tabs */
  const tab = e.target.closest && e.target.closest('[role="tab"]');
  if (tab && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    const tabs = [...document.querySelectorAll('[role="tab"]')], i = tabs.indexOf(tab);
    state.tab = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].dataset.id;
    renderPackages();
    $(`[role="tab"][data-id="${state.tab}"]`)?.focus();
    e.preventDefault();
  }
});

/* =====================================================================
   BOOT
   ===================================================================== */
$("#brandMark").innerHTML = MARK;
$("#footMark").innerHTML = MARK;
buildMega();
loadCart();
state.view = routeFromHash();
render();
