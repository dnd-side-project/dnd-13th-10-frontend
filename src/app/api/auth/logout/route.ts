import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(_req: NextRequest) {
  const cookieStore = await cookies();
  const refresh = cookieStore.get('devseed_refresh')?.value;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_DEVSEED_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(refresh ? { Cookie: `refresh_token=${refresh}` } : {}),
      },
      cache: 'no-store',
    });
  } catch (e) {
    console.error('Backend logout failed', e);
  }

  const res = new NextResponse(null, { status: 204 });
  res.cookies.set('devseed_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  res.cookies.set('devseed_refresh', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return res;
}
