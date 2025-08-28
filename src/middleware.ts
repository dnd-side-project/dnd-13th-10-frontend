import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED = [
  '/home',
  '/my-page',
  '/schedule',
  '/community',
  '/api/set-token',
  '/api/auth/refresh',
];
const TOKEN_QUERY_KEY = 'token';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'devseed_token';

function isProtected(pathname: string) {
  return PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'));
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const tokenFromQuery = searchParams.get(TOKEN_QUERY_KEY);
  const hasCookie = !!req.cookies.get(COOKIE_NAME)?.value;

  if (tokenFromQuery) {
    const dest = req.nextUrl.clone();
    const callback = searchParams.get('callbackUrl') || '/home';

    dest.pathname = callback;
    dest.search = '';

    const res = NextResponse.redirect(dest);

    res.cookies.set(COOKIE_NAME, tokenFromQuery, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 2,
    });

    return res;
  }

  if (isProtected(pathname) && !hasCookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('callbackUrl', pathname + (req.nextUrl.search || ''));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home/:path*',
    '/my-page/:path*',
    '/schedule/:path*',
    '/community/:path*',
  ],
};
