import database from "../data/nz_database.json";
import servicesData from "../data/services.json";
import articlesData from "../data/articles.json";

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
.service-content-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:900;color:#0d1b2a;margin:28px 0 14px;letter-spacing:-.02em}
.service-content-box h2:first-child{margin-top:0}
.service-content-box h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0d1b2a;margin:24px 0 12px}
.service-content-box p{color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px}
.service-content-box ul{margin:0 0 20px;padding-left:20px;color:#475569;font-size:15px;line-height:1.75}

.warning-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0 32px}
.warning-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#0d1b2a}
.warning-card span{color:#f97316;font-size:20px}

.checklist-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0 32px;font-size:14px;font-weight:700;color:#1e293b}
.check-item-line{display:flex;align-items:center;gap:10px;background:#f0f9ff;border:1px solid #bae6fd;padding:12px 16px;border-radius:12px;}
.check-item-line span{color:#0ea5e9;font-weight:900;font-size:16px}

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
            <a href="https://${DOMAIN}/services/blocked-drain-unblocking/">Drain Hydro-Jet Unblocking</a>
            <a href="https://${DOMAIN}/services/hot-water-cylinder-repair/">Hot Water Cylinder Repair</a>
            <a href="https://${DOMAIN}/services/gas-leak-repair/">Certified Gasfitting</a>
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
        <a href="https://${DOMAIN}/services/blocked-drain-unblocking/">Drain Hydro-Jetting</a>
        <a href="https://${DOMAIN}/services/hot-water-cylinder-repair/">Hot Water Cylinders</a>
        <a href="https://${DOMAIN}/services/gas-leak-repair/">Gasfitting &amp; Leak Repair</a>
        <a href="https://${DOMAIN}/services/water-leak-detection/">Acoustic Leak Detection</a>
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


function markdownToHtml(md: string): string {
  if (!md) return "";
  let html = md
    .replace(/^### (.*$)/gim, '<h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#0d1b2a;margin:22px 0 10px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:900;color:#0d1b2a;margin:28px 0 14px;">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#0ea5e9;font-weight:700;">$1</a>')
    .replace(/^- (.*$)/gim, '<li style="margin-bottom:6px;">$1</li>');
  
  html = html.replace(/(<li style="margin-bottom:6px;">.*?<\/li>\n?)+/gs, (match) => `<ul style="margin:0 0 20px;padding-left:20px;color:#475569;line-height:1.75;">${match}</ul>`);
  
  const paragraphs = html.split(/\n\n+/);
  return paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<div") || trimmed.startsWith("<table")) return trimmed;
    return `<p style="color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px;">${trimmed}</p>`;
  }).join("\n");
}

export function homePage(regions: RegionItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const regionPills = regions.map(r => `<a class="dir-card-white" href="https://${r.code.toLowerCase()}.${DOMAIN}/"><span>📍 ${esc(r.name)}</span></a>`).join("");
  const topServicesCards = servicesData.slice(0, 6).map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">${s.icon || '🔧'}</div><h3>${esc(s.name || s.title)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Read More →</a></div>`).join("");

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

  <section class="sec-white" style="padding:80px 0;">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center;">
      <div>
        <span class="tag-badge">NATIONWIDE DISPATCH</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Fast 24/7 Response When Minutes Count</h2>
        <p style="color:#475569;font-size:16px;line-height:1.75;margin-bottom:18px;">When a pipe bursts at 2 AM or your hot water cylinder leaks through the ceiling, you need a local master plumber who responds instantly. ${BRAND} connects Kiwi property owners directly with PGDB licensed specialists armed with state-of-the-art diagnostic and repair equipment.</p>
        
        <div class="warning-cards-grid">
          <div class="warning-card"><span>🚨</span> Burst Pipe Shut-off</div>
          <div class="warning-card"><span>⚠️</span> Gas Leak Odor Alert</div>
          <div class="warning-card"><span>💧</span> Sewer Backup Overflow</div>
          <div class="warning-card"><span>🔥</span> No Hot Water Cylinder</div>
        </div>

        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> PGDB Certificated Master Plumbers</div>
          <div class="check-item-line"><span>✔</span> High-Pressure Hydro-Jet Drain Cleaning</div>
          <div class="check-item-line"><span>✔</span> Acoustic Water Leak Detection</div>
          <div class="check-item-line"><span>✔</span> Gasfitting &amp; Continuous Flow Gas</div>
        </div>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Master Plumber New Zealand" style="width:100%;height:460px;object-fit:cover;border-radius:24px;box-shadow:0 20px 48px rgba(0,0,0,.12);">
      </div>
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

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const cards = servicesData.map((s: any) => `<div class="service-hub-card"><div><div class="service-hub-icon">${s.icon || '🔧'}</div><h3>${esc(s.name || s.title)}</h3><p>${esc(s.description || s.summary)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">View Full Service Details →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Services</div><h1>Certified Plumbing Services <span>Across New Zealand</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${cards}</div></div></section></main>`;
  return shell(`Plumbing Services Directory | ${BRAND}`, "Complete list of 24/7 plumbing services in NZ.", canonical, body);
}

export function singleServicePage(service: any) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const serviceName = service.name || service.title || "Plumbing Service";
  const desc = service.description || service.summary || "Comprehensive emergency plumbing services across New Zealand.";

  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(serviceName)}</div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">24/7 NZ MASTER SERVICE DISPATCH</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:900;color:#fff;line-height:1.1;margin:14px 0;">
          ${esc(serviceName)} <span style="color:#38bdf8;">New Zealand</span>
        </h1>
        <p style="color:#cbd5e1;font-size:16px;line-height:1.7;margin-bottom:24px;">${esc(desc)} PGDB certificated master plumbers on standby 24/7 for residential, commercial, and industrial plumbing emergencies.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a><a class="btn-glass-cyan" href="https://${DOMAIN}/contact/">Get Free Estimate</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get instant estimate for ${esc(serviceName)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Call Now &amp; Book →</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-bar">
    <div class="wrap stats-grid">
      <div class="stat-item"><h3>30 Mins</h3><p>Fast Dispatch</p></div>
      <div class="stat-item"><h3>PGDB</h3><p>Certificated Plumbers</p></div>
      <div class="stat-item"><h3>100%</h3><p>Upfront Transparent Pricing</p></div>
      <div class="stat-item"><h3>4.9 ★</h3><p>Verified Rating</p></div>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <h2>Expert ${esc(serviceName)} Solutions in New Zealand</h2>
        <p>Dealing with ${esc(serviceName.toLowerCase())} issues requires experienced professionals who understand New Zealand plumbing codes, high-pressure hot water systems, and local drainage infrastructure. At ${BRAND}, our certified technicians provide rapid diagnostic inspections and long-lasting repairs.</p>

        <div class="warning-cards-grid">
          <div class="warning-card"><span>🚨</span> Emergency 24/7 Response</div>
          <div class="warning-card"><span>🛡️</span> PGDB Licensed &amp; Insured</div>
          <div class="warning-card"><span>⚡</span> Rapid Diagnostic Equipment</div>
          <div class="warning-card"><span>💎</span> 100% Guaranteed Workmanship</div>
        </div>

        <h2>Why Professional ${esc(serviceName)} Matters</h2>
        <p>Attempting DIY fixes on plumbing systems can lead to catastrophic water damage, un-insured structural flooding, or gas safety hazards. Our master plumbers utilize state-of-the-art acoustic leak detectors, high-pressure hydro-jetters, and CCTV pipe inspection cameras to fix the root cause immediately.</p>

        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Acoustic Ultrasonic Leak Detection</div>
          <div class="check-item-line"><span>✔</span> High-Pressure Hydro-Jetting</div>
          <div class="check-item-line"><span>✔</span> CCTV Drain Camera Inspection</div>
          <div class="check-item-line"><span>✔</span> Gasfitting Safety Certification</div>
        </div>

        <h2>Our 4-Step ${esc(serviceName)} Process</h2>
        <ul style="line-height:1.8;color:#475569;">
          <li><b>1. Immediate Dispatch:</b> We receive your request and dispatch the nearest PGDB licensed master plumber to your location within 30 minutes.</li>
          <li><b>2. Comprehensive Inspection:</b> Using advanced diagnostic tools, we locate the exact cause of the issue without invasive tearing.</li>
          <li><b>3. Upfront Fixed Quote:</b> You receive a clear, itemized price quote before any work begins — no hidden fees or after-hours surcharges.</li>
          <li><b>4. Quality Repair &amp; Clean-Up:</b> Our certified team performs the repair, tests system pressure, and leaves your premises clean.</li>
        </ul>

        ${mapEmbedHtml("New Zealand")}

        <h2>Frequently Asked Questions</h2>
        <details class="faq-item-white" open>
          <summary>How quickly can a plumber arrive for ${esc(serviceName)}?</summary>
          <p>Our emergency response team is available 24/7 and typical dispatch time is under 30 minutes across all major New Zealand regions.</p>
        </details>
        <details class="faq-item-white">
          <summary>Are your plumbers licensed in New Zealand?</summary>
          <p>Yes, all technicians in our referral network hold valid Plumbers, Gasfitters and Drainlayers Board (PGDB) licenses and full liability insurance.</p>
        </details>
        <details class="faq-item-white">
          <summary>Do you provide upfront quotes?</summary>
          <p>Absolutely. We inspect the issue first and provide a fixed upfront quote before commencing any repair work.</p>
        </details>
      </div>

      <div>
        <div class="white-form-card" style="position:sticky;top:90px;">
          <h3>Need Help Now?</h3>
          <p>Speak directly with 24/7 NZ Plumbing Dispatch</p>
          <a href="${PHONE_HREF}" class="btn-cta" style="width:100%;margin-bottom:16px;">📞 Call ${PHONE_DISPLAY}</a>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">Mon–Sun 24 Hours Open. PGDB licensed master plumbers available for immediate dispatch across New Zealand.</p>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${serviceName} New Zealand | 24/7 Master Plumbers | ${BRAND}`, desc, canonical, body, {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    provider: { "@type": "Organization", name: BRAND },
    areaServed: "New Zealand"
  });
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const cards = articlesData.map((a: any) => `<div class="blog-card"><div class="blog-card-body"><div class="blog-date">Master Plumber Guide</div><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><a href="https://${DOMAIN}/articles/${a.slug}/">Read Full Guide →</a></div></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Guides</div><h1>Plumbing &amp; Drainlaying <span>Expert Guides NZ</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${cards}</div></div></section></main>`;
  return shell(`Plumbing Guides &amp; Advice | ${BRAND}`, "Master plumber articles and advice.", canonical, body);
}

export function singleArticlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const title = article.title || "Plumbing Guide";
  const summary = article.summary || article.excerpt || "Expert plumbing advice from PGDB certificated master plumbers.";
  const articleHtml = article.content ? markdownToHtml(article.content) : `<p>${esc(summary)}</p>`;

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/articles/">Guides</a> / ${esc(title)}</div>
      <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5vw,50px);font-weight:900;color:#fff;line-height:1.15;">${esc(title)}</h1>
      <p style="color:#cbd5e1;font-size:16px;margin-top:12px;">By Certified Master Plumber &amp; PGDB Editorial Team · Updated 2026</p>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        ${articleHtml}

        <div style="margin-top:36px;padding:28px;background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:16px;box-shadow:0 8px 24px rgba(14,165,233,.08);">
          <h3 style="margin:0 0 8px;color:#0d1b2a;font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;">Need Immediate Emergency Plumbing Assistance?</h3>
          <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.65;">Our 24/7 NZ dispatch team is standing by to connect you with PGDB licensed master plumbers in your area.</p>
          <a href="${PHONE_HREF}" class="btn-cta">📞 Call ${PHONE_DISPLAY} Now</a>
        </div>
      </div>

      <div>
        <div class="white-form-card" style="position:sticky;top:90px;">
          <h3>Need Professional Help?</h3>
          <p>Get fast estimate from local NZ plumbers</p>
          <a href="${PHONE_HREF}" class="btn-cta" style="width:100%;margin-bottom:14px;">📞 ${PHONE_DISPLAY}</a>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">Mon–Sun 24 Hours Open. PGDB licensed master plumbers available for immediate dispatch across New Zealand.</p>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${title} | ${BRAND}`, summary, canonical, body, {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: { "@type": "Organization", name: BRAND }
  });
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
  
  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Service Areas</a> / ${esc(region.name)}</div>
      <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,54px);font-weight:900;color:#fff;line-height:1.1;">
        24/7 Emergency Plumbing in <span style="color:#38bdf8;">${esc(region.name)}</span>
      </h1>
      <p style="color:#cbd5e1;font-size:16px;margin-top:12px;">Local PGDB certificated master plumbers serving all cities and suburbs in ${esc(region.name)}.</p>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <h2 class="sec-title" style="color:#0d1b2a;">Select Your Suburb in ${esc(region.name)}</h2>
      <div class="dir-grid">${cityDirectoryHtml}</div>
      ${mapEmbedHtml(region.name + ", New Zealand")}
    </div>
  </section>
  </main>`;
  return shell(`24/7 Plumbing Services in ${region.name} | ${BRAND}`, `24/7 emergency plumbing across ${region.name}.`, canonical, body);
}

export function suburbPage(region: RegionItem, city: CityItem, host: string) {
  const canonical = `https://${host}/`;
  
  const body = `<main>
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / ${esc(region.name)} / ${esc(city.name)}</div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">24/7 LOCAL ${esc(city.name).toUpperCase()} PLUMBING</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:900;color:#fff;line-height:1.1;margin:14px 0;">
          24/7 Emergency Plumbing in <span style="color:#38bdf8;">${esc(city.name)}, ${esc(region.name)}</span>
        </h1>
        <p style="color:#cbd5e1;font-size:16px;line-height:1.7;margin-bottom:24px;">PGDB certificated master plumbers on call 24 hours in ${esc(city.name)}. 30-minute emergency arrival for burst pipes, unblocking drains, hot water cylinder repair, and gasfitting.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Local ${esc(city.name)} Quote</h3>
          <p>Get fast service in ${esc(city.name)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Call Local Plumber →</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <h2>Local Certified Plumbing Experts in ${esc(city.name)}</h2>
        <p>When you encounter a plumbing emergency in ${esc(city.name)}, ${esc(region.name)}, you need a local master plumber who can reach your home fast. ${BRAND} dispatches certified technicians equipped with hydro-jetters, acoustic leak detectors, and pipe replacement gear directly to ${esc(city.name)} properties.</p>

        <div class="warning-cards-grid">
          <div class="warning-card"><span>🚨</span> 30-Min ${esc(city.name)} Arrival</div>
          <div class="warning-card"><span>🛡️</span> PGDB Licensed &amp; Insured</div>
        </div>

        ${mapEmbedHtml(city.name + ", " + region.name + ", New Zealand")}
      </div>

      <div>
        <div class="white-form-card">
          <h3>24/7 ${esc(city.name)} Dispatch</h3>
          <p>Call ${PHONE_DISPLAY}</p>
          <a href="${PHONE_HREF}" class="btn-cta" style="width:100%;">📞 Call ${PHONE_DISPLAY}</a>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`24/7 Emergency Plumbing in ${city.name}, ${region.name} | ${BRAND}`, `24/7 local plumber in ${city.name}, ${region.name}.`, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404 Not Found</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}

export function privacyPolicyPage() { return shell(`Privacy Policy | ${BRAND}`, "Privacy Policy", `https://${DOMAIN}/privacy-policy/`, `<main class="sec-white"><div class="wrap"><h1>Privacy Policy</h1><p>We respect your privacy. All information collected is strictly used for service dispatch.</p></div></main>`); }
export function termsOfServicePage() { return shell(`Terms | ${BRAND}`, "Terms", `https://${DOMAIN}/terms/`, `<main class="sec-white"><div class="wrap"><h1>Terms of Service</h1><p>Terms and conditions for ${BRAND} New Zealand emergency plumbing network.</p></div></main>`); }
export function disclaimerPage() { return shell(`Disclaimer | ${BRAND}`, "Disclaimer", `https://${DOMAIN}/disclaimer/`, `<main class="sec-white"><div class="wrap"><h1>Disclaimer</h1><p>Independent contractor referral service disclaimer.</p></div></main>`); }

export function areasWeServePage(regions: RegionItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const regionPills = regions.map(r => `<a class="dir-card-white" href="https://${r.code.toLowerCase()}.${DOMAIN}/"><span>📍 ${esc(r.name)}</span></a>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Areas</div><h1>All New Zealand <span>Service Regions Directory</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="dir-grid">${regionPills}</div></div></section></main>`;
  return shell(`All New Zealand Service Regions Directory | ${BRAND}`, "Complete directory of all New Zealand plumbing service areas.", canonical, body);
}
