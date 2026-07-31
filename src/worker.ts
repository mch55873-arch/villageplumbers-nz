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
        const txt = `User-agent: *\nAllow: /\n\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
        return htmlResponse(txt, method, 200, { "content-type": "text/plain" });
      }

      if (path === "/about" || path === "/about/") return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
      if (path === "/contact" || path === "/contact/") return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
      if (path === "/privacy-policy" || path === "/privacy-policy/") return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
      if (path === "/terms" || path === "/terms/") return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
      if (path === "/disclaimer" || path === "/disclaimer/") return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));
      if (path === "/areas-we-serve" || path === "/areas-we-serve/") return cached(request, ctx, () => htmlResponse(areasWeServePage(REGIONS), method));

      if (path === "/services" || path === "/services/") return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
      if (path.startsWith("/services/")) {
        const slug = path.split("/")[2];
        const service = servicesData.find((s: any) => s.slug === slug);
        if (service) return cached(request, ctx, () => htmlResponse(singleServicePage(service), method));
      }

      if (path === "/articles" || path === "/articles/") return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
      if (path.startsWith("/articles/")) {
        const slug = path.split("/")[2];
        const article = articlesData.find((a: any) => a.slug === slug);
        if (article) return cached(request, ctx, () => htmlResponse(singleArticlePage(article), method));
      }

      return notFound("Page not found", method);
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
