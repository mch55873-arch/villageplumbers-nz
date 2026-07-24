import { sitemapIndex } from "../../src/sitemaps";
import database from "../../data/nz_database.json";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return sitemapIndex(database.regions, request.method);
}

export async function HEAD(request: Request) {
  return sitemapIndex(database.regions, request.method);
}
