import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sitemapIndex, coreSitemap, regionSitemap, type RegionItem } from './src/sitemaps';
import database from './data/nz_database.json';

const REGIONS = database.regions as RegionItem[];
const REGION_BY_CODE = new Map(REGIONS.map((r) => [r.code.toLowerCase(), r]));

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|logo.png|robots.txt).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const rawHost = req.headers.get('host') || req.headers.get('x-forwarded-host') || '';
  
  // Cleanly strip port numbers (e.g. :443, :3000)
  const hostname = rawHost.split(':')[0].toLowerCase();
  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost' : 'villageplumbers.co.nz';

  // DIRECT SITEMAP HANDLERS INSIDE MIDDLEWARE (0ms Edge Execution)
  if (path === '/sitemap.xml') {
    return sitemapIndex(REGIONS, req.method);
  }

  if (path === '/sitemaps/core.xml') {
    return coreSitemap(REGIONS, req.method);
  }

  const sitemapMatch = path.match(/^\/sitemaps\/(.+)-(\d+)\.xml$/);
  if (sitemapMatch) {
    const regionCode = sitemapMatch[1].toLowerCase();
    const region = REGION_BY_CODE.get(regionCode);
    if (region) {
      const sitemap = regionSitemap(region, Number(sitemapMatch[2]), req.method);
      if (sitemap) return sitemap;
    }
  }

  // 1. Redirect legacy apex /subdomain/... URLs to canonical subdomain hostnames (308 Permanent Redirect)
  if ((hostname === baseDomain || hostname === `www.${baseDomain}`) && url.pathname.startsWith('/subdomain/')) {
    const parts = url.pathname.replace(/^\/subdomain\//, '').split('/');
    const sub = parts[0];
    const rest = parts.slice(1).join('/');
    if (sub) {
      const targetUrl = `https://${sub}.${baseDomain}/${rest}`;
      return NextResponse.redirect(targetUrl, 308);
    }
  }

  // 2. Subdomain host rewriting
  if (hostname !== baseDomain && hostname.endsWith(baseDomain)) {
    let subdomain = hostname;
    if (hostname.endsWith(`.${baseDomain}`)) {
      subdomain = hostname.slice(0, -(baseDomain.length + 1));
    }
    
    if (subdomain !== 'www' && subdomain.length > 0 && subdomain !== baseDomain) {
      const excludedPaths = ['/about', '/contact', '/blog', '/services', '/areas-we-serve', '/author'];
      const isExcluded = excludedPaths.some(p => url.pathname === p || url.pathname.startsWith(`${p}/`));
      
      if (!isExcluded) {
        return NextResponse.rewrite(new URL(`/subdomain/${subdomain}${url.pathname}`, req.url));
      }
    }
  }

  return NextResponse.next();
}

export default middleware;
