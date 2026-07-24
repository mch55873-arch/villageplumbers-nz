import { coreSitemap, type RegionItem } from "../../../src/sitemaps";
import database from "../../../data/nz_database.json";

export const dynamic = "force-dynamic";

const REGIONS = database.regions as RegionItem[];

export async function GET(request: Request) {
  return coreSitemap(REGIONS, request.method);
}

export async function HEAD(request: Request) {
  return coreSitemap(REGIONS, request.method);
}
