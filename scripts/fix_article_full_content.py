import os

print("=== FIXING ARTICLE FULL CONTENT RENDERING FOR VILLAGE PLUMBERS NZ ===")

# Read existing locationTemplates.ts
with open("src/locationTemplates.ts", "r", encoding="utf-8") as f:
  code = f.read()

# Add markdownToHtml helper function
md_helper = '''
function markdownToHtml(md: string): string {
  if (!md) return "";
  let html = md
    .replace(/^### (.*$)/gim, '<h3 style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:20px;font-weight:800;color:#0d1b2a;margin:22px 0 10px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:26px;font-weight:900;color:#0d1b2a;margin:28px 0 14px;">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2" style="color:#0ea5e9;font-weight:700;">$1</a>')
    .replace(/^- (.*$)/gim, '<li style="margin-bottom:6px;">$1</li>');
  
  html = html.replace(/(<li style="margin-bottom:6px;">.*?<\\/li>\\n?)+/gs, (match) => `<ul style="margin:0 0 20px;padding-left:20px;color:#475569;line-height:1.75;">${match}</ul>`);
  
  const paragraphs = html.split(/\\n\\n+/);
  return paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<div") || trimmed.startsWith("<table")) return trimmed;
    return `<p style="color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px;">${trimmed}</p>`;
  }).join("\\n");
}
'''

# Update singleArticlePage implementation to use markdownToHtml(article.content)
new_single_article_page = '''
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
'''

# Replace in locationTemplates.ts
import re

# Insert markdownToHtml before homePage
code = code.replace(
    'export function homePage(regions: RegionItem[]) {',
    md_helper + '\nexport function homePage(regions: RegionItem[]) {',
)

# Replace singleArticlePage
code = re.sub(
    r'export function singleArticlePage\(article: any\) \{.*?\n\}',
    new_single_article_page.strip(),
    code,
    flags=re.DOTALL,
)

with open('src/locationTemplates.ts', 'w', encoding='utf-8') as f:
  f.write(code)

print('[OK] Successfully injected markdownToHtml and updated singleArticlePage')
