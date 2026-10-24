# EverCloud: website + order system (free to run)

A static website plus a small, locked-down order API and a real database, all on Cloudflare's free plan.

```
Visitor's browser ──► public/ files (the website) ──► POST /api/order ──► src/worker.js ──► D1 database
                                                       (checks everything, calculates the price itself)
```

**Why this design is safe:** the browser never touches the database and never holds a database password. It only talks to `/api/order`, and that code decides what is allowed.

---

## 1. Which file goes where

| File | What it is | Do you edit it? |
|---|---|---|
| `public/settings.js` | **Your business settings:** prices, add-ons, contact details, payment links, spam-check key, currency | **Yes, this is the main one** |
| `public/app.js` | The website's logic (pages, checkout). Also holds the service descriptions and the sample "Work" entries | Yes, to replace the sample work entries and FAQ |
| `public/index.html` | The page shell (title, description, fonts) | Rarely |
| `public/styles.css` | All the styling | Rarely |
| `public/_headers` | Browser security rules (CSP etc.) | No |
| `public/fonts/` | Fonts, hosted by you (no Google request) | No |
| `src/worker.js` | The order API: validation, price calculation, spam checks, saves to the database | No |
| `schema.sql` | Creates the `orders` table | No |
| `wrangler.jsonc` | Tells Cloudflare what to deploy. **You paste your database ID here once** | Once |
| `.dev.vars.example` | Template for local-only secrets | Copy it |
| `package.json` | Shortcut commands (`npm run dev`, `npm run deploy` ...) | No |

---

## 2. Run it on your computer (Windows 10)

**Why:** you test everything locally first, so mistakes cost nothing.

1. Install **Node.js LTS** from https://nodejs.org (accept the defaults), then close and reopen your terminal.
2. Open **Command Prompt** (not PowerShell, see Troubleshooting) and go to the folder. If it is on Drive E:
   ```
   E:
   cd E:\evercloud
   ```
3. Install the tools (this downloads Wrangler, Cloudflare's command-line tool):
   ```
   npm install
   ```
4. Create your local secrets file and the local test database:
   ```
   copy .dev.vars.example .dev.vars
   npm run db:local
   ```
5. Start the site:
   ```
   npm run dev
   ```
6. Open **http://localhost:8787**, pick a package, and place a test order.
7. See that it was saved (this reads the *local* test database):
   ```
   npx wrangler d1 execute evercloud-db --local --command "SELECT ref, name, package, due_today FROM orders"
   ```

Press `Ctrl+C` to stop the server.

---

## 3. Put it online (free)

1. **Create a free account** at https://dash.cloudflare.com/sign-up and choose the Free plan.
2. **Log in from the terminal** (opens your browser to approve):
   ```
   npx wrangler login
   ```
3. **Create the real database:**
   ```
   npx wrangler d1 create evercloud-db
   ```
   It prints a `database_id`. Open `wrangler.jsonc` and replace `PASTE-YOUR-DATABASE-ID-HERE` with it.
   *Why:* this is the link between your code and your database.
4. **Create the table in the real database:**
   ```
   npm run db:remote
   ```
5. **Add a private random salt** (any long random text; it makes the stored visitor hashes unguessable):
   ```
   npx wrangler secret put IP_SALT
   ```
6. **Deploy:**
   ```
   npm run deploy
   ```
   The first time, Wrangler may ask you to pick a free `workers.dev` name. It then prints your live address, like `https://evercloud.YOURNAME.workers.dev`.
7. **Turn on spam protection (do this before you share the link):**
   - Cloudflare dashboard → **Turnstile** → **Add widget** → add your live hostname → copy the **Site key** and the **Secret key**.
   - Paste the **site key** into `public/settings.js` (`TURNSTILE_SITEKEY`).
   - Store the **secret key** privately: `npx wrangler secret put TURNSTILE_SECRET`
   - `npm run deploy` again.
   - Set **both or neither**. A secret without a site key makes every order fail with "security check failed".
8. **Optional, email yourself when an order arrives** (free Resend account, sends to *your own* email):
   ```
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put OWNER_EMAIL
   ```
   On Resend's free plan without your own domain, mail can only go to the email you signed up with. That is exactly what this needs.

---

## 4. Day-to-day

| I want to... | Command |
|---|---|
| See the 20 latest orders | `npm run orders` |
| Mark an order paid | `npx wrangler d1 execute evercloud-db --remote --command "UPDATE orders SET status='paid' WHERE ref='EC-XXXXXXXX'"` |
| Back up the database | `npx wrangler d1 export evercloud-db --remote --output=backup.sql` (keep it somewhere private, it holds customer data) |
| Delete a customer's data on request | `npx wrangler d1 execute evercloud-db --remote --command "DELETE FROM orders WHERE email='x@y.com'"` |
| Browse in the dashboard | Cloudflare → Workers & Pages → D1 → `evercloud-db` |
| Watch errors live | `npx wrangler tail` |

Status values: `new`, `invoiced`, `paid`, `in_progress`, `done`, `cancelled`.

---

## 5. Before you tell customers about it

- [ ] Replace the sample prices in `public/settings.js` and the sample **Work** entries/FAQ in `public/app.js` with real ones. Fake case studies presented as real are a legal and trust problem.
- [ ] Fill in `CONTACT` (email, phone, WhatsApp), then set `SHOW_SAMPLE_NOTE = false`.
- [ ] Check `CURRENCY` ("$" by default; your customers pay with bKash/Nagad, so you may want "৳").
- [ ] Decide how you take payment (see limits below). Paste real `https://` payment links in `PAYMENT.links` if you have them.
- [ ] Add a short privacy notice (the form collects name, email, phone) and tell customers how to ask for deletion.
- [ ] Check the copy claims ("Fixed scope in writing", "Every project here started as one of our packages") are true for your business.

---

## 6. What was wrong, and what changed

**Security**

| Problem in the original | Fix |
|---|---|
| Prices were calculated in the browser and sent as `dueToday`/`monthly`, so a visitor could change them | The browser sends only package and add-on IDs. `src/worker.js` looks up prices in `settings.js` and ignores any price sent. Tested with a tampered `$1` price. |
| Order reference `EC-` + timestamp: guessable, not unique | Random 8-character reference made by the server, unique in the database |
| Order endpoint was an open webhook URL: no spam protection, no limits | Honeypot field, Cloudflare Turnstile, and 5 orders per hour / 15 per day per visitor (stored as one-way hashes, never raw IPs) |
| No input limits (a visitor could send megabytes) | Field limits in the form, the API and the database; 8 KB request cap read as a stream |
| No security headers | CSP, clickjacking protection, `nosniff`, referrer policy, permissions policy, HSTS in `public/_headers` |
| Fonts loaded from Google (visitor IPs shared with a third party) | Fonts hosted by you; CSP allows only your own origin plus Turnstile |
| `#constructor` or `#__proto__` in the address bar broke the page | Safe route lookup |
| Payment links were put into `href` without a scheme check | Only `https://` links are accepted; `rel="noopener noreferrer"` |
| Tampered `localStorage` cart could break the page | Cart is validated before use |
| Server errors could leak details | Generic messages to visitors; details only in `wrangler tail` |

**Bugs**

| Problem | Fix |
|---|---|
| `<title>`, `<link>`, `<style>`, `<svg>` sat inside `<body>`; duplicate viewport and `:root` rules; `charset=utf8`; no `lang`; stray `claude:` meta tag | Clean, valid `index.html` |
| Back button left the site (used `replaceState`) | Real history entries; Back and Forward work |
| Ctrl/Cmd+click on links was hijacked | Opens in a new tab as expected |
| Pressing Escape anywhere moved focus to the Services button | Only acts when the menu is open |
| Help page showed a developer message ("Add your contact details in the CONTACT setting...") to visitors | Friendly fallback text |
| "Demo checkout" banners and "not connected in this demo" text shown to visitors | Honest wording: nothing is charged on the page; an invoice follows |
| Order was shown as "received" even if nothing was sent; no double-click protection | Confirmation only after the server saved it; button locks while sending; 15 s timeout; clear error messages |
| Cart stayed in `localStorage` after ordering | Cleared on success |
| Page title never changed | Updates per page |

**Accessibility and polish:** skip link, focus moves to the page heading after navigation, proper tab roles with arrow-key support, field errors linked to inputs and cleared as soon as the visitor fixes them, `maxlength`/`inputmode`/`type="tel"` on fields, meta description, favicon, `noscript` message.

**Optimization (honest numbers):** CSS and JS are now separate files, so the browser caches them and a price change doesn't re-download the stylesheet. There are no third-party requests for fonts. Code size is about the same as before (about 29 KB gzipped across `index.html`, CSS, JS and settings, versus 25 KB for the single file), plus about 105 KB of self-hosted fonts (cached for a year). Cloudflare compresses and caches everything on its network automatically.

---

## 7. Known limits (please read)

- **Payments are not automated.** The site records the order and you send an invoice, or you paste a payment link per method. A static link does not tell your site that the customer paid, so always confirm in your bank/bKash/Nagad/Stripe dashboard before marking an order `paid`. A real gateway (for example SSLCommerz or Stripe Checkout with a webhook) is the next upgrade and needs its own Worker route.
- **No admin web page.** You read orders with commands or the Cloudflare dashboard.
- **Pages use `#` addresses** (`/#packages`), so Google sees one page. For an SEO business that is worth fixing later with real paths (`/packages`) and one HTML file per page.
- **Free-plan limits:** D1 free allows 5 million row reads and 100,000 row writes per day and 5 GB total; Workers free allows 100,000 requests per day. An agency site will not come close, but check Cloudflare's pricing page if traffic grows.
- **Tested here:** 50 automated API/database checks and 47 front-end checks (all passed) using a local server and simulated browser. I could not test in a real browser or against Cloudflare's live network from my environment, so please do the test order in section 3 on your live address, including the Turnstile box.

---

## 8. Troubleshooting

| Message or symptom | Fix |
|---|---|
| `running scripts is disabled on this system` (PowerShell) | Use **Command Prompt** instead, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `npm` or `npx` is not recognized | Install Node.js, then close and reopen the terminal |
| Deploy fails with a database / `database_id` error | Step 3 of section 3: paste the real ID into `wrangler.jsonc` |
| Orders fail with "Security check failed" | Site key and secret key must both be set, from the same Turnstile widget, with your live hostname added to the widget |
| "Too many orders" while testing | The limit is 5 per hour per visitor. Wait, or test from another network |
| Order fails with a database error after deploy | You skipped `npm run db:remote` |
| Changed `settings.js` but the live site looks the same | Run `npm run deploy` again, then hard-refresh with `Ctrl+F5` |
