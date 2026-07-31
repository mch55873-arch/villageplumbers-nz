import database from "../data/nz_database.json";
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
${entries.map((loc) => `  <sitemap>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join("\n")}
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
${urls.map((loc) => `  <url>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`).join("\n")}
</urlset>`;
  return xmlResponse(body, method);
}
