import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token, maxAgeSec = 60 * 60 } = await req.json();

  if (!token || typeof token !== 'string') {
    return NextResponse.json(
      { ok: false, error: 'MISSING_TOKEN' },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set('devseed_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSec,
  });
  return res;
}
