import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED = ['/home', '/my-page', '/schedule', '/community'];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const needsAuth = PROTECTED.some(
    p => pathname === p || pathname.startsWith(p + '/'),
  );

  if (!needsAuth) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const url = new URL('/', req.url);
    url.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/my-page/:path*',
    '/schedule/:path*',
    '/community/:path*',
  ],
};
