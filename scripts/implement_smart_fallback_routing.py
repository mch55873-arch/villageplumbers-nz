import os

print("=== IMPLEMENTING SMART ZERO-404 FUZZY ROUTING ENGINE IN SRC/WORKER.TS ===")

new_worker_code = '''import database from "../data/nz_database.json";
import servicesData from "../data/services.json";
import articlesData from "../data/articles.json";
import {
  aboutUsPage,
  areasWeServePage,
  articlesHubPage,
  contactUsPage,
  disclaimerPage,
  homePage,
  notFoundPage,
  privacyPolicyPage,
  regionPage,
  servicesHubPage,
  singleArticlePage,
  singleServicePage,
  suburbPage,
  termsOfServicePage,
  type RegionItem,
  type CityItem,
} from "./locationTemplates";
import { coreSitemap, regionSitemap, sitemapIndex } from "./sitemaps";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = "villageplumbers.co.nz";
const rawRegions: RegionItem[] = (database as any).regions || (database as any).default?.regions || [];
const rawServices: any[] = (servicesData as any).default || (Array.isArray(servicesData) ? servicesData : []);
const rawArticles: any[] = (articlesData as any).default || (Array.isArray(articlesData) ? articlesData : []);

const REGION_BY_CODE = new Map<string, RegionItem>();
const CITY_BY_SUBDOMAIN = new Map<string, { region: RegionItem; city: CityItem }>();
const CITY_BY_SLUG = new Map<string, { region: RegionItem; city: CityItem }>();

for (const r of rawRegions) {
  if (r && r.code) {
    const code = r.code.toLowerCase();
    REGION_BY_CODE.set(code, r);
    REGION_BY_CODE.set(code.replace(/-region$/, ""), r);
  }
  if (r && r.cities) {
    for (const c of r.cities) {
      if (c) {
        if (c.subdomain) CITY_BY_SUBDOMAIN.set(c.subdomain.toLowerCase(), { region: r, city: c });
        if (c.slug) CITY_BY_SLUG.set(c.slug.toLowerCase(), { region: r, city: c });
      }
    }
  }
}

// Smart Fuzzy Matcher for any legacy/indexed subdomains (e.g. porirua-wellington, porirua, etc.)
function resolveSubdomain(sub: string): { type: "region" | "suburb"; region: RegionItem; city?: CityItem; hostname: string } {
  const cleanSub = sub.toLowerCase();
  
  // 1. Direct Region Code
  if (REGION_BY_CODE.has(cleanSub)) {
    return { type: "region", region: REGION_BY_CODE.get(cleanSub)!, hostname: `${cleanSub}.${DOMAIN}` };
  }

  // 2. Direct Subdomain Code
  if (CITY_BY_SUBDOMAIN.has(cleanSub)) {
    const match = CITY_BY_SUBDOMAIN.get(cleanSub)!;
    return { type: "suburb", region: match.region, city: match.city, hostname: `${cleanSub}.${DOMAIN}` };
  }

  // 3. Direct City Slug
  if (CITY_BY_SLUG.has(cleanSub)) {
    const match = CITY_BY_SLUG.get(cleanSub)!;
    return { type: "suburb", region: match.region, city: match.city, hostname: `${cleanSub}.${DOMAIN}` };
  }

  // 4. Token Fuzzy Matching (e.g. 'porirua-wellington' -> matches city 'porirua' or region 'wellington')
  const parts = cleanSub.split("-").filter(p => p.length >= 3);
  for (const part of parts) {
    if (CITY_BY_SLUG.has(part)) {
      const match = CITY_BY_SLUG.get(part)!;
      return { type: "suburb", region: match.region, city: match.city, hostname: `${cleanSub}.${DOMAIN}` };
    }
    if (REGION_BY_CODE.has(part)) {
      return { type: "region", region: REGION_BY_CODE.get(part)!, hostname: `${cleanSub}.${DOMAIN}` };
    }
  }

  // 5. Broad substring match across all cities
  for (const [slug, match] of CITY_BY_SLUG.entries()) {
    if (cleanSub.includes(slug) || slug.includes(cleanSub)) {
      return { type: "suburb", region: match.region, city: match.city, hostname: `${cleanSub}.${DOMAIN}` };
    }
  }

  // 6. Universal Safety Fallback -> Auckland Region
  const defaultRegion = rawRegions[0] || { code: "auckland", name: "Auckland", cities: [] };
  return { type: "region", region: defaultRegion as RegionItem, hostname: `${cleanSub}.${DOMAIN}` };
}

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
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    // 1. Sitemaps & Robots.txt
    if (path === "/sitemap.xml") return cached(request, ctx, () => sitemapIndex(rawRegions, method));
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

    // 2. Core Global Pages
    if (path === "/about") return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
    if (path === "/contact") return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
    if (path === "/privacy-policy") return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
    if (path === "/terms") return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
    if (path === "/disclaimer") return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));
    if (path === "/areas-we-serve") return cached(request, ctx, () => htmlResponse(areasWeServePage(rawRegions), method));

    // 3. Services Hub & Single Service Pages
    if (path === "/services") return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
    if (path.startsWith("/services/")) {
      const slug = path.split("/")[2];
      const service = rawServices.find((s: any) => s.slug === slug);
      if (service) return cached(request, ctx, () => htmlResponse(singleServicePage(service), method));
      // Fallback to services hub if unknown service slug
      return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
    }

    // 4. Articles Hub & Single Article Pages
    if (path === "/articles") return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
    if (path.startsWith("/articles/")) {
      const slug = path.split("/")[2];
      const article = rawArticles.find((a: any) => a.slug === slug);
      if (article) return cached(request, ctx, () => htmlResponse(singleArticlePage(article), method));
      // Fallback to articles hub if unknown article slug
      return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
    }

    // 5. Main Domain Homepage & Fallback
    if (hostname === DOMAIN || hostname === `www.${DOMAIN}`) {
      if (path === "/" || path === "") return cached(request, ctx, () => htmlResponse(homePage(rawRegions), method));
      
      // Smart path fallback for indexed location URLs like /porirua-wellington/ or /locations/auckland/
      const cleanPathSlug = path.replace(/^\\/+/, "").replace(/\\/+$|\\/.*$/, "").toLowerCase();
      if (cleanPathSlug) {
        const resolved = resolveSubdomain(cleanPathSlug);
        if (resolved.type === "suburb" && resolved.city) {
          return cached(request, ctx, () => htmlResponse(suburbPage(resolved.region, resolved.city, hostname), method));
        }
        if (resolved.region) {
          return cached(request, ctx, () => htmlResponse(regionPage(resolved.region), method));
        }
      }
      return cached(request, ctx, () => htmlResponse(homePage(rawRegions), method));
    }

    // 6. Subdomain Local Pages (Region, Suburb, or Indexed Subdomain)
    if (hostname.endsWith(`.${DOMAIN}`)) {
      const sub = hostname.slice(0, -(DOMAIN.length + 1));
      const resolved = resolveSubdomain(sub);

      if (path === "/" || path === "") {
        if (resolved.type === "suburb" && resolved.city) {
          return cached(request, ctx, () => htmlResponse(suburbPage(resolved.region, resolved.city, hostname), method));
        }
        return cached(request, ctx, () => htmlResponse(regionPage(resolved.region), method));
      }

      // Universal fallbacks for subdomains
      return cached(request, ctx, () => htmlResponse(regionPage(resolved.region), method));
    }

    return cached(request, ctx, () => htmlResponse(homePage(rawRegions), method));
  },
};
'''

with open("src/worker.ts", "w", encoding="utf-8") as f:
  f.write(new_worker_code)

print("[OK] Smart Zero-404 Fuzzy Routing Engine written to src/worker.ts")
