import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  const loginUrl = new URL('/login', req.url);
  const homeUrl = new URL('/', req.url);

  if (req.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
