import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { SignJWT, type JWTPayload } from 'jose';

export const runtime = 'nodejs';
export const revalidate = 0;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}

async function signBackendJWT(payload: JWTPayload, expiresIn = '10m') {
  const secret = new TextEncoder().encode(requireEnv('BACKEND_JWT_SECRET'));
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(requireEnv('BACKEND_JWT_ISS'))
    .setAudience(requireEnv('BACKEND_JWT_AUD'))
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const claims = {
    sub: session.user.id,
    scope: 'user:read',
  } satisfies JWTPayload;

  const bearer = await signBackendJWT(claims, '10m');

  const res = await fetch('https://devseed.store/', {
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: {
      'content-type': res.headers.get('content-type') ?? 'application/json',
    },
  });
}
