import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth';
import type { Session } from 'next-auth';

type MiddlewareRequest = NextRequest & { auth: Session | null };

export default auth((req: MiddlewareRequest) => {
  const isAuthed = !!req.auth;

  const protectedPaths = ['/home', '/my-page', '/schedule', '/community'];
  const { pathname } = req.nextUrl;

  const needsAuth = protectedPaths.some(
    p => pathname === p || pathname.startsWith(p + '/'),
  );

  if (needsAuth && !isAuthed) {
    const signInUrl = new URL('/auth/signin', req.nextUrl);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/home/:path*',
    '/my-page/:path*',
    '/schedule/:path*',
    '/community/:path*',
  ],
};
