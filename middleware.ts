import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost:3000' : 'villageplumbers.co.nz';

  if (hostname !== baseDomain && hostname.endsWith(baseDomain)) {
    const subdomain = hostname.replace(`.${baseDomain}`, '');
    
    if (subdomain !== 'www' && subdomain.length > 0) {
      const excludedPaths = ['/about', '/contact', '/blog'];
      const isExcluded = excludedPaths.some(p => url.pathname === p || url.pathname.startsWith(`${p}/`));
      
      if (!isExcluded) {
        return NextResponse.rewrite(new URL(`/subdomain/${subdomain}${url.pathname}`, req.url));
      }
    }
  }

  return NextResponse.next();
}

export default middleware;
