import { coreSitemap, regionSitemap, type RegionItem } from "../../../src/sitemaps";
import database from "../../../data/nz_database.json";

export const dynamic = "force-dynamic";

const REGIONS = database.regions as RegionItem[];
const REGION_BY_CODE = new Map(REGIONS.map((r) => [r.code.toLowerCase(), r]));

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (slug === "core.xml") {
    return coreSitemap(REGIONS, request.method);
  }

  const sitemapMatch = slug.match(/^(.+)-(\d+)\.xml$/);
  if (sitemapMatch) {
    const regionCode = sitemapMatch[1].toLowerCase();
    const region = REGION_BY_CODE.get(regionCode);
    if (!region) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
    const sitemap = regionSitemap(region, Number(sitemapMatch[2]), request.method);
    if (!sitemap) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
    return sitemap;
  }

  return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
}

export async function HEAD(request: Request, context: { params: Promise<{ slug: string }> }) {
  return GET(request, context);
}
