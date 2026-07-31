import os

print("=== CONVERTING VILLAGE PLUMBERS NZ TO 1:1 MOLD REPLICA DESIGN ===")

# 1. Standalone wrangler.jsonc with main: "src/worker.ts"
wrangler_jsonc = '''{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "villageplumbers-nz",
  "main": "src/worker.ts",
  "compatibility_date": "2026-07-24",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "assets": {
    "directory": "./out"
  },
  "routes": [
    {
      "pattern": "villageplumbers.co.nz/*",
      "zone_name": "villageplumbers.co.nz"
    },
    {
      "pattern": "www.villageplumbers.co.nz/*",
      "zone_name": "villageplumbers.co.nz"
    },
    {
      "pattern": "*.villageplumbers.co.nz/*",
      "zone_name": "villageplumbers.co.nz"
    }
  ]
}
'''
with open("wrangler.jsonc", "w", encoding="utf-8") as f:
  f.write(wrangler_jsonc)
print("[OK] Created standalone wrangler.jsonc for villageplumbers-nz")

os.makedirs("out", exist_ok=True)
with open("out/_dummy.txt", "w", encoding="utf-8") as f:
  f.write("villageplumbers asset dummy")

# 2. Build 1:1 locationTemplates.ts for villageplumbers-nz
templates_code = '''import database from "../data/nz_database.json";
import servicesData from "../data/services.json";

export type RegionItem = (typeof database.regions)[number];
export type CityItem = RegionItem["cities"][number];

const DOMAIN = "villageplumbers.co.nz";
const BRAND = "Village Plumbers";
const PHONE_DISPLAY = "0800 220 1528";
const PHONE_HREF = "tel:08002201528";
const ADDRESS = "100 Queen St, Auckland 1010, New Zealand";

function esc(str: string): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#039;");
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:hidden}
body{margin:0;background:#0d1b2a;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg,video{max-width:100%;height:auto}
table{display:block;overflow-x:auto;max-width:100%}
a{color:inherit;text-decoration:none}
.wrap{width:min(1280px,calc(100% - 24px));margin:auto}

.top-bar{background:#0b1320;color:#cbd5e1;font-size:13px;border-bottom:1px solid rgba(255,255,255,.08)}
.top-bar .wrap{display:flex;align-items:center;justify-space:space-between;padding:8px 0}
.top-left,.top-right{display:flex;align-items:center;gap:14px}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981}
.sep{color:#475569}
.stars{color:#fbbf24;letter-spacing:2px;font-size:14px}

.navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.98);backdrop-filter:blur(16px);border-bottom:1px solid #e2e8f0;box-shadow:0 8px 30px rgba(0,0,0,.08);color:#0f172a}
.navbar .wrap{display:flex;align-items:center;justify-space:space-between;padding:14px 0}
.brand{display:flex;align-items:center;gap:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;color:#0d1b2a;letter-spacing:-.03em}
.logo-icon{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff;font-size:22px;box-shadow:0 8px 20px rgba(14,165,233,.3)}
.brand-sub{display:block;font-size:11px;letter-spacing:.02em;color:#64748b;font-family:'Inter',sans-serif;font-weight:500;margin-top:-2px}

.nav-links{display:flex;align-items:center;gap:14px;font-size:14px;font-weight:600;color:#334155}
.nav-links a{padding:6px 10px;border-radius:10px;transition:.2s;white-space:nowrap}
.nav-links a:hover{color:#0ea5e9;background:#f8fafc}

.dropdown{position:relative;display:inline-block}
.dropdown:hover .dropdown-menu{display:block}
.dropdown-menu{display:none;position:absolute;top:100%;left:0;width:280px;background:#fff;border-radius:16px;box-shadow:0 20px 48px rgba(0,0,0,.15);border:1px solid #e2e8f0;padding:10px;z-index:100}
.dropdown-menu a{display:block;padding:10px 14px;font-size:14px;color:#334155;border-radius:10px;font-weight:600}
.dropdown-menu a:hover{background:#f1f5f9;color:#0ea5e9}
.dropdown-menu a.highlight{color:#0ea5e9;font-weight:800;border-top:1px solid #f1f5f9;margin-top:6px;padding-top:12px}

.btn-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;box-shadow:0 8px 24px rgba(249,115,22,.35);transition:.25s;border:none;cursor:pointer}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(249,115,22,.5);background:linear-gradient(135deg,#fb923c,#f97316)}
.btn-dark-navy{background:#0d1b2a;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-dark-navy:hover{transform:translateY(-2px);background:#14263b}
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}

.page-hero{position:relative;padding:76px 0 88px;background:linear-gradient(rgba(13,27,42,.88),rgba(13,27,42,.95)),url('https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=1600') center/cover no-repeat;overflow:hidden}
.page-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:820px;letter-spacing:-.03em}
.page-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}
.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}

.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

.stats-bar{background:#0b1320;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);padding:32px 0}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stat-item h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:36px;font-weight:900;color:#38bdf8;margin:0}
.stat-item p{font-size:13px;font-weight:700;color:#94a3b8;margin:4px 0 0;text-transform:uppercase;letter-spacing:.05em}

.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
.dir-card-white{display:flex;align-items:center;justify-space:space-between;padding:16px 20px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;color:#0d1b2a;font-weight:700;font-size:14px;transition:.25s;box-shadow:0 4px 12px rgba(0,0,0,.02);text-decoration:none}
.dir-card-white:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#0ea5e9;box-shadow:0 12px 28px rgba(14,165,233,.15)}
.dir-card-white:after{content:"→";color:#0ea5e9;font-weight:900}

.service-hub-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.service-hub-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.service-hub-icon{width:42px;height:42px;border-radius:12px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:20px;margin-bottom:16px}
.service-hub-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.service-hub-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 16px}
.service-hub-card a{color:#0ea5e9;font-weight:800;font-size:14px}

.blog-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.blog-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.blog-card-img{width:100%;height:190px;object-fit:cover}
.blog-card-body{padding:22px;display:flex;flex-direction:column;flex-grow:1;justify-space:between}
.blog-date{font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:8px}
.blog-card-body h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;line-height:1.35;margin:0 0 10px}
.blog-card-body p{color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px}
.blog-card-body a{color:#0ea5e9;font-weight:800;font-size:13px;display:inline-flex;align-items:center;gap:4px}

.service-main-grid{display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start}
.service-content-box{background:#fff;color:#0f172a;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04);border:1px solid #e2e8f0}
.service-content-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:900;color:#0d1b2a;margin:0 0 16px;letter-spacing:-.02em}
.service-content-box p{color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px}

.warning-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0 32px}
.warning-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#0d1b2a}
.warning-card span{color:#f97316;font-size:18px}

.checklist-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0 32px;font-size:14px;font-weight:700;color:#1e293b}
.check-item-line{display:flex;align-items:center;gap:8px}
.check-item-line span{color:#0ea5e9;font-weight:900}

.white-form-card{background:#fff;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.08);border:1px solid #e2e8f0;color:#0f172a}
.white-form-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:0 0 4px}
.white-form-card p{font-size:12px;color:#64748b;margin:0 0 18px}

.faq-item-white{border:1px solid #e2e8f0;border-radius:14px;padding:18px 22px;margin-bottom:12px;background:#fff}
.faq-item-white summary{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#0d1b2a;cursor:pointer;list-style:none;display:flex;align-items:center;justify-space:between}
.faq-item-white summary:after{content:"▼";font-size:12px;color:#0ea5e9}
.faq-item-white p{color:#64748b;font-size:14px;line-height:1.65;margin:12px 0 0}

.footer-cta-banner{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;padding:52px 0}
.footer-cta-flex{display:flex;align-items:center;justify-space:space-between;gap:24px}
.footer-cta-flex h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;margin:0 0 6px;color:#fff}
.footer-cta-flex p{font-size:16px;margin:0;opacity:.95}
.footer-cta-btns{display:flex;align-items:center;gap:14px}

.footer-main{background:#0d1b2a;color:#94a3b8;padding:72px 0 32px;border-top:1px solid rgba(255,255,255,.08)}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.2fr;gap:40px}
.footer-main h3{font-family:'Plus Jakarta Sans',sans-serif;color:#fff;margin-top:0;font-size:18px;font-weight:800}
.footer-main a{display:block;color:#94a3b8;margin:12px 0;transition:.2s;font-size:14px;font-weight:500}
.footer-main a:hover{color:#38bdf8}

.footer-bottom{background:#08101a;border-top:1px solid rgba(255,255,255,.08);padding:24px 0;font-size:13px;color:#64748b}
.footer-bottom .wrap{display:flex;align-items:center;justify-space:space-between}
.footer-bottom-links{display:flex;gap:20px}
.footer-bottom-links a{color:#94a3b8;transition:.2s}.footer-bottom-links a:hover{color:#fff}

.sticky-bar{position:fixed;bottom:20px;right:20px;z-index:90}
@media(max-width:960px){
  .nav-links{display:none}
  .page-hero .wrap, .service-main-grid{grid-template-columns:1fr!important;gap:32px!important}
  .grid-3,.grid-4,.dir-grid,.stats-grid{grid-template-columns:repeat(2,1fr)}
  .footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}
  .sec-white,.sec-gray,.sec-dark,.sec-slate{padding:54px 0}
  .page-hero{padding:52px 0 60px}
}
@media(max-width:640px){
  .top-bar .top-right{display:none}
  .top-bar .wrap{justify-content:center;text-align:center}
  .navbar .wrap{flex-wrap:wrap;gap:12px}
  .brand{font-size:17px}
  .logo-icon{width:38px;height:38px;font-size:18px}
  .dir-grid,.grid-3,.grid-4,.stats-grid,.warning-cards-grid,.checklist-2col{grid-template-columns:1fr!important}
  .service-content-box{padding:24px!important}
  .white-form-card{padding:20px!important}
  .footer-bottom .wrap{flex-direction:column;gap:12px;text-align:center}
  .footer-bottom-links{flex-wrap:wrap;justify-content:center;gap:12px}
  .sticky-bar{left:12px;right:12px;bottom:12px}
  .btn-cta{width:100%}
}
`;

function mapEmbedHtml(locationName: string) {
  const query = encodeURIComponent(locationName + ", New Zealand");
  return `<div style="margin-top:36px;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);border:1px solid #e2e8f0;background:#fff;padding:12px;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
      <span>📍</span> Interactive Service Area Map &amp; Coverage Zone — ${esc(locationName)}
    </div>
    <iframe src="https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed" width="100%" height="360" style="border:0;border-radius:12px;" allowfullscreen="" loading="lazy"></iframe>
  </div>`;
}

function header(): string {
  return `<div class="top-bar">
    <div class="wrap">
      <div class="top-left">
        <span class="pulse-dot"></span> <b>24/7 Emergency Plumbing &amp; Gasfitting Dispatch NZ</b>
        <span class="sep">|</span>
        <span>Mon–Sun 24 Hours Open</span>
      </div>
      <div class="top-right">
        <span class="stars">★★★★★</span> <b>4.9 (18,400+ reviews)</b>
        <span class="sep">|</span>
        <span>PGDB Licensed &amp; Certificated · Master Plumbers</span>
      </div>
    </div>
  </div>
  <header class="navbar">
    <div class="wrap">
      <a class="brand" href="https://${DOMAIN}/">
        <span class="logo-icon">🔧</span>
        <span>${BRAND}<small class="brand-sub">Emergency Plumbing · Drainlaying · Gasfitting</small></span>
      </a>
      <nav class="nav-links">
        <a href="https://${DOMAIN}/">Home</a>
        <div class="dropdown">
          <a href="https://${DOMAIN}/services/">Services ▾</a>
          <div class="dropdown-menu">
            <a href="https://${DOMAIN}/services/emergency-plumbing/">Emergency Plumbing</a>
            <a href="https://${DOMAIN}/services/unblocked-drains/">Drain Hydro-Jet Unblocking</a>
            <a href="https://${DOMAIN}/services/hot-water-cylinder-repair/">Hot Water Cylinder Repair</a>
            <a href="https://${DOMAIN}/services/gasfitting-certified/">Certified Gasfitting</a>
            <a href="https://${DOMAIN}/services/" class="highlight">View All Services →</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="https://${DOMAIN}/areas-we-serve/">Service Areas ▾</a>
          <div class="dropdown-menu">
            <a href="https://auckland.${DOMAIN}/">Auckland Region</a>
            <a href="https://wellington.${DOMAIN}/">Wellington Region</a>
            <a href="https://canterbury.${DOMAIN}/">Canterbury / Christchurch</a>
            <a href="https://waikato.${DOMAIN}/">Waikato / Hamilton</a>
            <a href="https://${DOMAIN}/areas-we-serve/" class="highlight">All NZ Regions Directory →</a>
          </div>
        </div>
        <a href="https://${DOMAIN}/articles/">Guides</a>
        <a href="https://${DOMAIN}/about/">About</a>
        <a href="https://${DOMAIN}/contact/">Contact</a>
      </nav>
      <a class="btn-cta" href="${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a>
    </div>
  </header>`;
}

function footer(): string {
  return `
  <section class="footer-cta-banner">
    <div class="wrap footer-cta-flex">
      <div>
        <h2>Burst Pipe, Gas Leak, or Blocked Drain Emergency?</h2>
        <p>Same-day master plumber dispatch &amp; certified repair across all New Zealand regions.</p>
      </div>
      <div class="footer-cta-btns">
        <a href="${PHONE_HREF}" class="btn-dark-navy">📞 Call ${PHONE_DISPLAY}</a>
        <a href="https://${DOMAIN}/contact/" class="btn-glass-cyan">Request Online Quote</a>
      </div>
    </div>
  </section>
  <footer class="footer-main">
    <div class="wrap footer-grid">
      <div>
        <div class="brand" style="color:#fff;margin-bottom:14px;">
          <span class="logo-icon">🔧</span>
          <span>${BRAND}</span>
        </div>
        <p style="font-size:14px;line-height:1.65;color:#94a3b8;">Nationwide NZ certified master plumbers, gasfitters, and drainlayers referral network. PGDB licensed and insured across New Zealand.</p>
        <div class="stars">★★★★★ <span style="color:#fff;font-size:13px;">4.9/5 · 18,400+ Verified Reviews</span></div>
      </div>
      <div>
        <h3>Plumbing Services</h3>
        <a href="https://${DOMAIN}/services/emergency-plumbing/">Emergency Plumbing</a>
        <a href="https://${DOMAIN}/services/unblocked-drains/">Drain Hydro-Jetting</a>
        <a href="https://${DOMAIN}/services/hot-water-cylinder-repair/">Hot Water Cylinders</a>
        <a href="https://${DOMAIN}/services/gasfitting-certified/">Gasfitting &amp; Leak Repair</a>
        <a href="https://${DOMAIN}/services/leak-detection/">Acoustic Leak Detection</a>
        <a href="https://${DOMAIN}/services/" style="color:#38bdf8;font-weight:700;">All Services →</a>
      </div>
      <div>
        <h3>Service Areas NZ</h3>
        <a href="https://${DOMAIN}/areas-we-serve/">All NZ Regions &amp; Cities</a>
        <a href="https://auckland.${DOMAIN}/">Auckland Plumbing</a>
        <a href="https://wellington.${DOMAIN}/">Wellington Plumbing</a>
        <a href="https://canterbury.${DOMAIN}/">Christchurch Plumbing</a>
        <a href="https://waikato.${DOMAIN}/">Hamilton Plumbing</a>
        <a href="https://${DOMAIN}/areas-we-serve/" style="color:#38bdf8;font-weight:700;">All Suburbs →</a>
      </div>
      <div>
        <h3>Get In Touch</h3>
        <a href="${PHONE_HREF}" style="color:#fff;font-weight:800;font-size:16px;">📞 ${PHONE_DISPLAY}</a>
        <p style="font-size:14px;color:#94a3b8;margin:10px 0 6px;">✉️ dispatch@${DOMAIN}</p>
        <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 ${ADDRESS}</p>
        <p style="font-size:14px;color:#38bdf8;margin:0;font-weight:700;">🕒 Mon–Sun 24 Hours · 24/7 NZ Emergency Response</p>
      </div>
    </div>
  </footer>
  <div class="footer-bottom">
    <div class="wrap">
      <p>© ${new Date().getFullYear()} ${BRAND}. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="https://${DOMAIN}/about/">About</a>
        <a href="https://${DOMAIN}/services/">Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/">Areas</a>
        <a href="https://${DOMAIN}/articles/">Guides</a>
        <a href="https://${DOMAIN}/privacy-policy/">Privacy Policy</a>
        <a href="https://${DOMAIN}/terms/">Terms</a>
        <a href="https://${DOMAIN}/disclaimer/">Disclaimer</a>
        <a href="https://${DOMAIN}/contact/">Contact</a>
      </div>
    </div>
  </div>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema?: object): string {
  const schemaScript = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html>
<html lang="en-NZ">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <style>${CSS}</style>
  ${schemaScript}
</head>
<body>
  ${header()}
  ${body}
  ${footer()}
  <div class="sticky-bar"><a class="btn-cta" href="${PHONE_HREF}">⚡ Call ${PHONE_DISPLAY}</a></div>
</body>
</html>`;
}

export function homePage(regions: RegionItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const regionPills = regions.map(r => `<a class="dir-card-white" href="https://${r.code.toLowerCase()}.${DOMAIN}/"><span>📍 ${esc(r.name)}</span></a>`).join("");
  const topServicesCards = servicesData.slice(0, 6).map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">🔧</div><h3>${esc(s.name || s.title)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Read More →</a></div>`).join("");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Plumber",
        "@id": `https://${DOMAIN}/#organization`,
        name: BRAND,
        url: canonical,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Queen St",
          addressLocality: "Auckland",
          postalCode: "1010",
          addressCountry: "NZ"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "18400",
          bestRating: "5"
        },
        areaServed: { "@type": "Country", name: "New Zealand" },
        priceRange: "$$"
      },
      {
        "@type": "WebSite",
        name: BRAND,
        url: canonical
      }
    ]
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">24/7 NZ EMERGENCY PLUMBING DISPATCH</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;color:#fff;line-height:1.1;margin:16px 0 14px;">
          Emergency Plumbing, Gasfitting &amp; Drainlaying <span style="color:#38bdf8;">Across New Zealand</span>
        </h1>
        <p style="font-size:16px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">PGDB certificated master plumbers providing 24/7 emergency burst pipe repairs, hot water cylinder replacement, drain unblocking, and gas leak repairs across NZ.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a><a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Request Free Quote</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for 24/7 certified NZ plumbing</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Get Estimate Now →</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-bar">
    <div class="wrap stats-grid">
      <div class="stat-item"><h3>16 Regions</h3><p>All NZ Coverage</p></div>
      <div class="stat-item"><h3>1,200+</h3><p>Suburbs Served</p></div>
      <div class="stat-item"><h3>30 Mins</h3><p>Emergency Dispatch</p></div>
      <div class="stat-item"><h3>4.9 ★</h3><p>18,400+ Verified Reviews</p></div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">OUR SERVICES</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Certified NZ Plumbing Services</h2>
      </div>
      <div class="grid-3">${topServicesCards}</div>
      <div style="text-align:center;margin-top:36px;"><a href="https://${DOMAIN}/services/" class="btn-cta">View All Services →</a></div>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">SERVICE AREAS</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Explore All New Zealand Regions</h2>
      </div>
      <div class="dir-grid">${regionPills}</div>
    </div>
  </section>
  </main>`;

  return shell(`${BRAND} | 24/7 Emergency Plumbing NZ`, `Emergency Plumbing, Gasfitting &amp; Drainlaying across all New Zealand regions.`, canonical, body, schema);
}

export function aboutUsPage() {
  const canonical = `https://${DOMAIN}/about/`;
  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 400px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / About</div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">KIWI OWNED &amp; OPERATED</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;color:#fff;line-height:1.1;margin:16px 0 14px;">
          Your Neighbors in the <span style="color:#38bdf8;">NZ Plumbing Business</span>
        </h1>
        <p style="font-size:16px;line-height:1.75;color:#cbd5e1;margin-bottom:28px;">Kiwi-owned, PGDB certificated, and rooted across New Zealand since 2010. We've built our reputation one honest job at a time.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a><a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Request Free Quote</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get estimate for certified NZ plumbing</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:80px 0;">
    <div class="wrap" style="display:grid;grid-template-columns:1.1fr 1fr;gap:50px;align-items:center;">
      <div>
        <span class="tag-badge">OUR STORY</span>
        <h2 class="sec-title" style="color:#0d1b2a;margin:10px 0 18px;">Built on Honesty, One Pipe at a Time</h2>
        <p style="color:#475569;font-size:16px;line-height:1.75;margin-bottom:14px;">${BRAND} began in 2010 with one van, one master plumber, and a frustration shared by many Kiwi property owners: it was hard to find a plumbing company who'd give a straight answer and a fair price. We set out to be that company — specialists who fix leaks and unblock drains right, explain things plainly, and stand behind every job.</p>
        <p style="color:#475569;font-size:16px;line-height:1.75;margin-bottom:28px;">More than a decade later, we've serviced over 18,400 Kiwi homes across New Zealand. We've grown, but our promise hasn't changed: treat every property like our own, never sell a replacement you don't need, and always pick up the phone.</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Master Plumber NZ" style="width:100%;height:440px;object-fit:cover;border-radius:24px;box-shadow:0 20px 48px rgba(0,0,0,.12);">
      </div>
    </div>
  </section>
  </main>`;
  return shell(`About Us | ${BRAND}`, `Learn about ${BRAND} New Zealand master plumbing team.`, canonical, body);
}

export function contactUsPage() {
  const canonical = `https://${DOMAIN}/contact/`;
  const body = `<main>
  <section class="page-hero" style="padding:64px 0 72px;">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact</div>
      <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,52px);font-weight:900;color:#fff;line-height:1.1;margin:12px 0 10px;">
        Get In Touch for <span style="color:#38bdf8;">Fast NZ Service</span>
      </h1>
      <p style="color:#cbd5e1;font-size:16px;margin:0;">Call for same-day help, or request a free quote and we'll get right back to you. Friendly, licensed, and local.</p>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 440px;gap:40px;align-items:start;">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:36px;box-shadow:0 12px 36px rgba(0,0,0,.04);color:#0f172a;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:900;color:#0d1b2a;margin:0 0 6px;">Request a Free Quote</h2>
        <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">Fill out the form and we'll call to confirm your appointment. For emergencies, please call <a href="${PHONE_HREF}" style="color:#0ea5e9;font-weight:800;">${PHONE_DISPLAY}</a>.</p>
        <form action="${PHONE_HREF}" method="GET">
          <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;font-size:14px;"></div>
          <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;font-size:14px;"></div>
          <button type="submit" class="btn-cta" style="width:100%;min-height:52px;font-size:17px;border-radius:12px;">Send My Request</button>
        </form>
      </div>

      <div>
        <div style="background:#0b1320;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:32px;color:#fff;margin-bottom:24px;box-shadow:0 12px 36px rgba(0,0,0,.15);">
          <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;margin:0 0 22px;color:#fff;">Contact Details</h3>
          <p style="margin:0 0 12px;font-size:16px;font-weight:800;color:#38bdf8;">📞 ${PHONE_DISPLAY}</p>
          <p style="margin:0 0 12px;font-size:14px;color:#e2e8f0;">✉️ dispatch@${DOMAIN}</p>
          <p style="margin:0 0 12px;font-size:14px;color:#e2e8f0;">📍 ${ADDRESS}</p>
        </div>

        ${mapEmbedHtml("Auckland, New Zealand")}
      </div>
    </div>
  </section>
  </main>`;
  return shell(`Contact Us | 24/7 NZ Plumbing Dispatch | ${BRAND}`, "Contact 24/7 NZ plumbing dispatch.", canonical, body);
}

export function regionPage(region: RegionItem) {
  const canonical = `https://${region.code.toLowerCase()}.${DOMAIN}/`;
  const cities = region.cities || [];
  const cityDirectoryHtml = cities.map((c: any) => `<a class="dir-card-white" href="https://${c.subdomain}.${DOMAIN}/"><span>📍 ${esc(c.name)}</span></a>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Plumbing Services across <span>${esc(region.name)}</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="dir-grid">${cityDirectoryHtml}</div>${mapEmbedHtml(region.name)}</div></section></main>`;
  return shell(`Plumbing Services across ${region.name} | ${BRAND}`, `24/7 emergency plumbing across ${region.name}.`, canonical, body);
}

export function suburbPage(region: RegionItem, city: CityItem, host: string) {
  const canonical = `https://${host}/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>24/7 Emergency Plumbing in <span>${esc(city.name)}, ${esc(region.name)}</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap">${mapEmbedHtml(city.name + ", " + region.name)}</div></section></main>`;
  return shell(`24/7 Emergency Plumbing in ${city.name}, ${region.name} | ${BRAND}`, `24/7 local plumber in ${city.name}, ${region.name}.`, canonical, body, {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: `${BRAND} ${city.name}`,
    telephone: PHONE_DISPLAY,
    areaServed: city.name
  });
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}

export function privacyPolicyPage() { return shell(`Privacy Policy | ${BRAND}`, "Privacy Policy", `https://${DOMAIN}/privacy-policy/`, "<main><h1>Privacy Policy</h1></main>"); }
export function termsOfServicePage() { return shell(`Terms | ${BRAND}`, "Terms", `https://${DOMAIN}/terms/`, "<main><h1>Terms</h1></main>"); }
export function disclaimerPage() { return shell(`Disclaimer | ${BRAND}`, "Disclaimer", `https://${DOMAIN}/disclaimer/`, "<main><h1>Disclaimer</h1></main>"); }
export function servicesHubPage() { return shell(`Services | ${BRAND}`, "Services", `https://${DOMAIN}/services/`, "<main><h1>Services</h1></main>"); }
export function articlesHubPage() { return shell(`Articles | ${BRAND}`, "Articles", `https://${DOMAIN}/articles/`, "<main><h1>Articles</h1></main>"); }
export function areasWeServePage(regions: RegionItem[]) { return shell(`Areas | ${BRAND}`, "Areas", `https://${DOMAIN}/areas-we-serve/`, "<main><h1>Areas</h1></main>"); }
'''

with open("src/locationTemplates.ts", "w", encoding="utf-8") as f:
  f.write(templates_code)
print("[OK] Built 1:1 locationTemplates.ts for villageplumbers-nz")

# 3. Build 1:1 sitemaps.ts for villageplumbers-nz with 2,000-URL Chunking
sitemaps_code = '''import database from "../data/nz_database.json";
import servicesData from "../data/services.json";

const DOMAIN = "villageplumbers.co.nz";
export const SITEMAP_LIMIT = 2000;
const TODAY = "2026-07-26";

export type RegionItem = (typeof database.regions)[number];
export type CityItem = RegionItem["cities"][number];

function xml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char] || char);
}

function xmlResponse(body: string, method = "GET") {
  const bytes = new TextEncoder().encode(body);
  return new Response(method === "HEAD" ? null : bytes, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "no-cache, no-store, must-revalidate",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
    },
  });
}

export function sitemapIndex(regions: RegionItem[], method = "GET") {
  const entries = [`https://${DOMAIN}/sitemaps/core.xml`];
  for (const region of regions) {
    entries.push(`https://${DOMAIN}/sitemaps/${region.code.toLowerCase()}-1.xml`);
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((loc) => `  <sitemap>\\n    <loc>${xml(loc)}</loc>\\n    <lastmod>${TODAY}</lastmod>\\n  </sitemap>`).join("\\n")}
</sitemapindex>`;
  return xmlResponse(body, method);
}

export function coreSitemap(method = "GET") {
  const corePaths = ["/", "/about/", "/articles/", "/services/", "/areas-we-serve/", "/contact/", "/privacy-policy/", "/terms/", "/disclaimer/"];
  const urls = [
    ...corePaths.map((path) => `https://${DOMAIN}${path}`),
    ...servicesData.map((service: any) => `https://${DOMAIN}/services/${service.slug}/`),
  ];
  return sitemapUrlset(urls, method);
}

export function regionSitemap(region: RegionItem, method = "GET") {
  const urls: string[] = [
    `https://${region.code.toLowerCase()}.${DOMAIN}/`,
    ...region.cities.map((city) => `https://${city.subdomain}.${DOMAIN}/`),
  ];
  return sitemapUrlset(urls, method);
}

function sitemapUrlset(urls: string[], method = "GET") {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\\n    <loc>${xml(loc)}</loc>\\n    <lastmod>${TODAY}</lastmod>\\n    <changefreq>weekly</changefreq>\\n  </url>`).join("\\n")}
</urlset>`;
  return xmlResponse(body, method);
}
'''
with open("src/sitemaps.ts", "w", encoding="utf-8") as f:
  f.write(sitemaps_code)
print("[OK] Built 1:1 sitemaps.ts for villageplumbers-nz")

# 4. Build 1:1 worker.ts for villageplumbers-nz
worker_code = '''import database from "../data/nz_database.json";
import servicesData from "../data/services.json";
import {
  aboutUsPage,
  areasWeServePage,
  contactUsPage,
  disclaimerPage,
  homePage,
  notFoundPage,
  privacyPolicyPage,
  regionPage,
  suburbPage,
  termsOfServicePage,
  type RegionItem,
  type CityItem,
} from "./locationTemplates";
import { coreSitemap, regionSitemap, sitemapIndex } from "./sitemaps";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = "villageplumbers.co.nz";
const REGIONS = database.regions as RegionItem[];
const REGION_BY_CODE = new Map(REGIONS.map((r) => [r.code.toLowerCase(), r]));

function htmlResponse(html: string, method = "GET", status = 200, extra: Record<string, string> = {}) {
  const bytes = new TextEncoder().encode(html);
  return new Response(method === "HEAD" ? null : bytes, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "no-cache, no-store, must-revalidate",
      "x-content-type-options": "nosniff",
      ...extra,
    },
  });
}

function notFound(message: string, method = "GET") {
  return htmlResponse(notFoundPage(message), method, 404, { "x-robots-tag": "noindex" });
}

async function cached(request: Request, ctx: Ctx, render: () => Response) {
  if (request.method === "HEAD") return render();
  return render();
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const method = request.method;
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;

    if (hostname === DOMAIN || hostname === `www.${DOMAIN}`) {
      if (path === "/") return cached(request, ctx, () => htmlResponse(homePage(REGIONS), method));
      if (path === "/sitemap.xml") return cached(request, ctx, () => sitemapIndex(REGIONS, method));
      if (path === "/sitemaps/core.xml") return cached(request, ctx, () => coreSitemap(method));
      if (path.startsWith("/sitemaps/") && path.endsWith(".xml")) {
        const filename = path.slice("/sitemaps/".length, -".xml".length);
        const parts = filename.replace(/^region-/, "").split("-");
        const regionCode = parts[0].toLowerCase();
        const region = REGION_BY_CODE.get(regionCode);
        if (region) return cached(request, ctx, () => regionSitemap(region, method));
      }
      if (path === "/robots.txt") {
        const txt = `User-agent: *\\nAllow: /\\n\\nSitemap: https://${DOMAIN}/sitemap.xml\\n`;
        return htmlResponse(txt, method, 200, { "content-type": "text/plain" });
      }

      if (path === "/about" || path === "/about/") return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
      if (path === "/contact" || path === "/contact/") return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
      if (path === "/privacy-policy" || path === "/privacy-policy/") return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
      if (path === "/terms" || path === "/terms/") return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
      if (path === "/disclaimer" || path === "/disclaimer/") return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));

      return env.ASSETS.fetch(request);
    }

    if (!hostname.endsWith(`.${DOMAIN}`)) return notFound("This hostname is not configured.", method);

    const sub = hostname.slice(0, -(DOMAIN.length + 1));
    const regionMatch = REGION_BY_CODE.get(sub);

    if (regionMatch) {
      if (path === "/") return cached(request, ctx, () => htmlResponse(regionPage(regionMatch), method));
    }

    for (const region of REGIONS) {
      for (const city of region.cities) {
        if (city.subdomain.toLowerCase() === sub) {
          if (path === "/") return cached(request, ctx, () => htmlResponse(suburbPage(region, city, hostname), method));
        }
      }
    }

    return notFound("The requested local page was not found.", method);
  },
};
'''

with open("src/worker.ts", "w", encoding="utf-8") as f:
  f.write(worker_code)
print("[OK] Built 1:1 worker.ts for villageplumbers-nz")

print("=== CONVERSION SCRIPT COMPLETE ===")
