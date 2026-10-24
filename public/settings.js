/* =====================================================================
   EVERCLOUD SETTINGS  -  the ONE file you edit to run your business.
   Used by the website (browser) AND by the order API (src/worker.js),
   so the prices a visitor sees are always the prices the server charges.
   Never put passwords or secret keys in this file: it is public.
   ===================================================================== */

export const CURRENCY = "$";                 // e.g. "$", "৳", "£"
export const CONTACT  = { email: "", phone: "", whatsapp: "" };   // shown on the Help page and after checkout
export const SHOW_SAMPLE_NOTE = true;        // set to false once prices and work entries are real

// Cloudflare Turnstile (free spam protection). Paste the PUBLIC "site key" here. The secret key goes in Cloudflare, not here.
export const TURNSTILE_SITEKEY = "";

export const PAYMENT = {
  methods: [
    { id:"card",  name:"Card",          note:"Visa, Mastercard and American Express" },
    { id:"bkash", name:"bKash",         note:"Mobile banking" },
    { id:"nagad", name:"Nagad",         note:"Mobile banking" },
    { id:"bank",  name:"Bank transfer", note:"Account details come with your invoice" }
  ],
  // Paste a real https:// payment-page URL for a method to switch it from demo to live.
  links: { card:"", bkash:"", nagad:"", bank:"" }
};

/* =====================================================================
   PACKAGES (sample prices: replace with your real ones)
   setup = one-time fee, monthly = recurring fee. "Due today" = setup + first month.
   ===================================================================== */
export const ADS_NOTE = "Ad budget is paid to the ad platform separately.";
const P = (id, svc, name, forWho, setup, monthly, time, items, rec, note) => ({ id, svc, name, for: forWho, setup, monthly, time, items, rec: !!rec, note: note || "" });
export const PKGS = [
  P("b-launch","bundle","Launch","New businesses getting online",1400,350,"Live in 4–6 weeks",["5-page business website","Local SEO set-up and listings","Monthly traffic report","One named contact"]),
  P("b-grow","bundle","Grow","Businesses ready to win more customers",2600,1200,"First results in 6–8 weeks",["Website with booking or shop (up to 30 products)","Ongoing SEO pages and fixes","Paid ads management","Email follow-up sequences","Monthly review call"],true,ADS_NOTE),
  P("b-scale","bundle","Scale","Teams that want growth on every channel",5500,2800,"Planned with you in week one",["Custom web app or client portal","Full SEO and content programme","Ads, social and email together","AI chatbot or workflow automation","Dedicated account manager"],false,ADS_NOTE),

  P("web-s","web","Starter","Small businesses getting online",800,0,"3–5 weeks",["Up to 5 pages","Mobile-first design","Contact form and map","Basic SEO set-up","One round of revisions"]),
  P("web-g","web","Growth","Shops, clinics and service firms",2200,0,"5–8 weeks",["Up to 15 pages or 30 products","Booking or checkout set-up","Payment options connected","Speed and security checks","Two rounds of revisions"],true),
  P("web-x","web","Scale","Portals, apps and larger sites",5500,0,"8–14 weeks",["Custom web app or portal","Secure login and user roles","Admin area","Staff training session","Three rounds of revisions"]),

  P("seo-s","seo","Starter","First steps in search",300,350,"Audit in 2 weeks, then monthly",["Full site audit","Fixes to your key pages","Local listings set-up","Monthly ranking report"]),
  P("seo-g","seo","Growth","Steady gains in rankings and traffic",600,750,"Monthly",["Everything in Starter","4 new or improved pages a month","Keyword and competitor tracking","Monthly review call"],true),
  P("seo-x","seo","Scale","Competitive markets and larger sites",1200,1500,"Monthly",["Everything in Growth","Technical fixes each month","Content and link-building plan","Priority support"]),

  P("mkt-s","mkt","Starter","Testing your first campaigns",250,450,"Launch in 1–2 weeks",["One ad platform","Audience and offer plan","Up to 4 ad variations a month","Monthly report"],false,ADS_NOTE),
  P("mkt-g","mkt","Growth","Steady leads from several channels",500,950,"Launch in 1–2 weeks",["Google and Meta ads","Landing page advice","Email follow-up sequence","Weekly tuning"],true,ADS_NOTE),
  P("mkt-x","mkt","Scale","Full-funnel growth",1000,1900,"Launch in 2–3 weeks",["Ads, social and email together","Short video and graphics","Tracking from click to sale","Dedicated strategist"],false,ADS_NOTE),

  P("crm-e","crm","Essentials","Light-touch care after launch",0,200,"Starts right away",["Priority email support","Monthly check-up","Quarterly report"]),
  P("crm-p","crm","Plus","Regular reviews and small changes",0,450,"Starts right away",["Everything in Essentials","Monthly report and review call","Goal tracking dashboard","Small changes included"],true),
  P("crm-d","crm","Dedicated","A named manager for your account",0,900,"Starts right away",["Everything in Plus","Named account manager","Quarterly planning workshop","Priority response on urgent issues"]),

  P("ai-s","ai","Starter","A first AI helper",900,0,"3–5 weeks",["Chatbot trained on your content","Website or messenger install","Hand-off to a person","30 days of tuning"]),
  P("ai-g","ai","Growth","Save hours every week",2400,150,"4–6 weeks",["Chatbot plus workflow automation","Process review to find time-wasters","Connected to your existing tools","Team training","Monthly tuning and report"],true),
  P("ai-x","ai","Scale","AI across your operations",6000,400,"8–12 weeks",["Custom tools built on your data","Dashboards that explain the numbers","Approval step for all AI output","Team training and handover","Monthly tuning and report"])
];
export const CUSTOM_PKG = { id:"custom", svc:"bundle", name:"Custom quote", for:"Something that does not fit a package", setup:0, monthly:0, time:"We reply with a quote", items:["We review your request","A quote with scope and price","No payment until you agree"], custom:true };
export const ADDONS = [
  { id:"copy",      name:"Professional copywriting",      note:"We write the text for your key pages", setup:250 },
  { id:"analytics", name:"Analytics and goal tracking",   note:"See which pages and ads bring enquiries", setup:120 },
  { id:"train",     name:"Team training session",         note:"One live session for your staff", setup:90 },
  { id:"care",      name:"Website care plan",             note:"Updates, backups and security checks", monthly:60 }
];
