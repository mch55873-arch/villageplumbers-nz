import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|logo.png|robots.txt|sitemap.xml).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const rawHost = req.headers.get('host') || req.headers.get('x-forwarded-host') || '';
  
  // Cleanly strip port numbers (e.g. :443, :3000)
  const hostname = rawHost.split(':')[0].toLowerCase();
  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost' : 'villageplumbers.co.nz';

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
