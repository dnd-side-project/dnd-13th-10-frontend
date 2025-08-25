// /middleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth(req => {
  const isAuthed = !!req.auth;

  // 보호할 경로들
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
    // 모든 경로 중 아래를 제외하고 검사:
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
