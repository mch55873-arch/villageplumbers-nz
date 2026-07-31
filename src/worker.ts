import database from "../data/nz_database.json";
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
const REGIONS = database.regions as RegionItem[];
const REGION_BY_CODE = new Map(REGIONS.map((r) => [r.code.toLowerCase(), r]));

// Map all city subdomains for fast O(1) lookup
const CITY_BY_SUBDOMAIN = new Map<string, { region: RegionItem; city: CityItem }>();
for (const region of REGIONS) {
  for (const city of region.cities) {
    if (city.subdomain) {
      CITY_BY_SUBDOMAIN.set(city.subdomain.toLowerCase(), { region, city });
    }
  }
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
    // Normalize path by stripping trailing slashes except for root
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    // 1. Core Sitemaps & Robots.txt
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
      const txt = `User-agent: *\nAllow: /\n\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
      return htmlResponse(txt, method, 200, { "content-type": "text/plain" });
    }

    // 2. Global Core Pages
    if (path === "/about") return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
    if (path === "/contact") return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
    if (path === "/privacy-policy") return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
    if (path === "/terms") return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
    if (path === "/disclaimer") return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));
    if (path === "/areas-we-serve") return cached(request, ctx, () => htmlResponse(areasWeServePage(REGIONS), method));

    // 3. Services Hub & Single Service Pages
    if (path === "/services") return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
    if (path.startsWith("/services/")) {
      const slug = path.split("/")[2];
      const service = servicesData.find((s: any) => s.slug === slug);
      if (service) return cached(request, ctx, () => htmlResponse(singleServicePage(service), method));
      return notFound(`Service "${slug}" was not found.`, method);
    }

    // 4. Articles Hub & Single Article Pages
    if (path === "/articles") return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
    if (path.startsWith("/articles/")) {
      const slug = path.split("/")[2];
      const article = articlesData.find((a: any) => a.slug === slug);
      if (article) return cached(request, ctx, () => htmlResponse(singleArticlePage(article), method));
      return notFound(`Article "${slug}" was not found.`, method);
    }

    // 5. Main Domain Homepage
    if (hostname === DOMAIN || hostname === `www.${DOMAIN}`) {
      if (path === "/" || path === "") return cached(request, ctx, () => htmlResponse(homePage(REGIONS), method));
      return notFound("The requested page was not found.", method);
    }

    // 6. Subdomain Local Pages (Region or Suburb)
    if (hostname.endsWith(`.${DOMAIN}`)) {
      const sub = hostname.slice(0, -(DOMAIN.length + 1));
      
      // Match Region Subdomain (e.g., auckland.villageplumbers.co.nz)
      const regionMatch = REGION_BY_CODE.get(sub);
      if (regionMatch) {
        if (path === "/" || path === "") return cached(request, ctx, () => htmlResponse(regionPage(regionMatch), method));
      }

      // Match Suburb Subdomain (e.g., ponsonby-auckland.villageplumbers.co.nz)
      const cityMatch = CITY_BY_SUBDOMAIN.get(sub);
      if (cityMatch) {
        if (path === "/" || path === "") return cached(request, ctx, () => htmlResponse(suburbPage(cityMatch.region, cityMatch.city, hostname), method));
      }

      return notFound(`The requested local page for "${sub}" was not found.`, method);
    }

    return notFound("The requested page was not found.", method);
  },
};
