import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE = process.env.NEXT_PUBLIC_DEVSEED_BASE_URL!;
const AUTH_HEADER = 'Authorization';
const AUTH_PREFIX = 'Bearer ';

export async function GET(req: NextRequest) {
  return handle(req);
}
export async function POST(req: NextRequest) {
  return handle(req);
}
export async function PUT(req: NextRequest) {
  return handle(req);
}
export async function PATCH(req: NextRequest) {
  return handle(req);
}
export async function DELETE(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  if (!BASE) {
    return NextResponse.json(
      { message: 'BACKEND_API_BASE is not set' },
      { status: 500 },
    );
  }

  const token = (await cookies()).get('devseed_token')?.value;
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized (no token)' },
      { status: 401 },
    );
  }

  const seg = req.nextUrl.pathname.replace(/^\/api\/proxy\/?/, '');
  const target = new URL(`${BASE.replace(/\/+$/, '')}/${seg}`);
  target.search = req.nextUrl.search; // ✅ 쿼리 통째로 복사

  const inHeaders = new Headers(req.headers);
  [
    'host',
    'content-length',
    'connection',
    'transfer-encoding',
    'cookie',
  ].forEach(h => inHeaders.delete(h));

  inHeaders.set(AUTH_HEADER, `${AUTH_PREFIX}${token}`);

  const body =
    req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : await req.arrayBuffer();

  const upstream = await fetch(target, {
    method: req.method,
    headers: inHeaders,
    body,
    redirect: 'manual',
    cache: 'no-store',
  });

  const status = upstream.status;
  const location = upstream.headers.get('location');

  if (status >= 300 && status < 400) {
    return NextResponse.json(
      { message: 'Auth redirect blocked', redirected_to: location },
      { status: 401 },
    );
  }

  if (status === 401) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    res.headers.append(
      'Set-Cookie',
      `devseed_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    );
    return res;
  }

  if (status >= 400) {
    const errText = await upstream.text();
    return NextResponse.json(safeJson(errText), { status });
  }

  const outHeaders = new Headers(upstream.headers);
  ['set-cookie', 'transfer-encoding', 'connection', 'content-encoding'].forEach(
    h => outHeaders.delete(h),
  );
  return new NextResponse(upstream.body, { status, headers: outHeaders });
}

function safeJson(t: string) {
  try {
    return JSON.parse(t);
  } catch {
    return { raw: t };
  }
}
