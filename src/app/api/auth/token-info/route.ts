import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const t = cookieStore.get('devseed_token')?.value;
  if (!t) return NextResponse.json({ hasToken: false }, { status: 200 });
  try {
    const [, payload] = t.split('.');
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const json = JSON.parse(Buffer.from(pad, 'base64').toString('utf8'));
    const expSec = json?.exp ?? null;
    return NextResponse.json({
      hasToken: true,
      expSec,
      nowSec: Math.floor(Date.now() / 1000),
      remainingMs: expSec ? Math.max(0, expSec * 1000 - Date.now()) : null,
    });
  } catch {
    return NextResponse.json({ hasToken: true, expSec: null });
  }
}
