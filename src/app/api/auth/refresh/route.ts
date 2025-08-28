import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  const cookieStore = await cookies();
  const myRefresh = cookieStore.get('devseed_refresh')?.value;
  if (!myRefresh) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  const url = `${process.env.NEXT_PUBLIC_DEVSEED_BASE_URL}/auth/refresh`;
  const upstream = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*;q=0.1',
      Cookie: `${encodeURIComponent('refresh_token')}=${encodeURIComponent(myRefresh)}`,
    },
    cache: 'no-store',
    redirect: 'manual',
  });

  const text = await upstream.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}

  if (!upstream.ok)
    return NextResponse.json(
      { status: upstream.status, upstream: json ?? { raw: text } },
      { status: upstream.status },
    );

  const access = json?.data?.accessToken;
  if (!access)
    return NextResponse.json(
      { message: 'No accessToken in response' },
      { status: 500 },
    );

  const accessMax = Number(3600);
  const res = NextResponse.json({}, { status: 204 });
  res.cookies.set('devseed_token', access, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: accessMax,
  });

  return res;
}
