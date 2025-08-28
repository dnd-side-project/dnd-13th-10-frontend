import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const {
    token,
    refreshToken,
    maxAgeSec = Number(3600),
    refreshMaxAgeSec = Number(60 * 60 * 24 * 14),
  } = await req.json();

  if (!token || typeof token !== 'string')
    return NextResponse.json(
      { ok: false, error: 'MISSING_ACCESS_TOKEN' },
      { status: 400 },
    );

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set('devseed_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSec,
  });
  if (refreshToken) {
    res.cookies.set('devseed_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: refreshMaxAgeSec,
    });
  }
  return res;
}
