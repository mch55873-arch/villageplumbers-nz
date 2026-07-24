import servicesData from "../data/services.json";
import database from "../data/nz_database.json";

const DOMAIN = "villageplumbers.co.nz";
export const SITEMAP_LIMIT = 2000;
const URLS_PER_CITY = servicesData.length + 1;

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
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      "cdn-cache-control": "public, max-age=604800",
      "cloudflare-cdn-cache-control": "public, max-age=604800",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
    },
  });
}

export function sitemapIndex(regions: RegionItem[], method = "GET") {
  const entries = [`https://${DOMAIN}/sitemaps/core.xml`];
  for (const region of regions) {
    const chunks = Math.ceil((region.cities.length * URLS_PER_CITY) / SITEMAP_LIMIT);
    for (let chunk = 1; chunk <= chunks; chunk++) {
      entries.push(`https://${DOMAIN}/sitemaps/${region.code}-${chunk}.xml`);
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((loc) => `  <sitemap><loc>${xml(loc)}</loc></sitemap>`).join("\n")}\n</sitemapindex>`;
  return xmlResponse(body, method);
}

export function coreSitemap(regions: RegionItem[], method = "GET") {
  const corePaths = [
    "/",
    "/about",
    "/blog",
    "/services",
    "/areas-we-serve",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/provider-disclosure",
  ];
  const urls = [
    ...corePaths.map((path) => `https://${DOMAIN}${path}`),
    ...servicesData.map((service) => `https://${DOMAIN}/${service.slug}`),
    ...regions.map((region) => `https://${region.code}.${DOMAIN}/`),
  ];
  return sitemapUrlset(urls, method);
}

export function regionSitemap(region: RegionItem, chunk: number, method = "GET") {
  if (!Number.isInteger(chunk) || chunk < 1) return null;
  const start = (chunk - 1) * SITEMAP_LIMIT;
  const total = region.cities.length * URLS_PER_CITY;
  if (start >= total) return null;
  const end = Math.min(total, start + SITEMAP_LIMIT);
  const urls: string[] = [];
  for (let index = start; index < end; index++) {
    const cityIndex = Math.floor(index / URLS_PER_CITY);
    const pageIndex = index % URLS_PER_CITY;
    const city = region.cities[cityIndex];
    const host = `${city.subdomain}.${DOMAIN}`;
    urls.push(pageIndex === 0 ? `https://${host}/` : `https://${host}/${servicesData[pageIndex - 1].slug}`);
  }
  return sitemapUrlset(urls, method);
}

function sitemapUrlset(urls: string[], method = "GET") {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${xml(loc)}</loc></url>`).join("\n")}\n</urlset>`;
  return xmlResponse(body, method);
}
