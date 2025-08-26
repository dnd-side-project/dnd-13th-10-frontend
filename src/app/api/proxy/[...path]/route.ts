import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE = process.env.NEXT_PUBLIC_DEVSEED_BASE_URL!;
const AUTH_HEADER = process.env.AUTH_HEADER ?? 'Authorization';
const AUTH_PREFIX = process.env.AUTH_PREFIX ?? 'Bearer ';

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

  const cookieStore = await cookies();
  const token = cookieStore.get('devseed_token')?.value;
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized (no token)' },
      { status: 401 },
    );
  }

  const pathname = req.nextUrl.pathname;
  const seg = pathname.replace(/^\/api\/proxy\/?/, '');

  const url = new URL(`${BASE.replace(/\/+$/, '')}/${seg}`);
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));

  const ct = req.headers.get('content-type') ?? undefined;
  const body =
    req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : await req.arrayBuffer();

  const upstream = await fetch(url, {
    method: req.method,
    headers: {
      ...(ct ? { 'Content-Type': ct } : {}),
      [AUTH_HEADER]: `${AUTH_PREFIX}${token}`,
      Accept: 'application/json, */*;q=0.1',
    },
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

  const text = await upstream.text();
  const h = new Headers(upstream.headers);
  h.delete('set-cookie');
  h.delete('transfer-encoding');
  h.delete('connection');
  h.delete('content-encoding');

  if (status === 401) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    res.headers.append(
      'Set-Cookie',
      `devseed_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    );
    return res;
  }
  if (status >= 400) {
    return NextResponse.json(safeJson(text), { status });
  }

  return new NextResponse(text, { status, headers: h });
}

function safeJson(t: string) {
  try {
    return JSON.parse(t);
  } catch {
    return { raw: t };
  }
}
