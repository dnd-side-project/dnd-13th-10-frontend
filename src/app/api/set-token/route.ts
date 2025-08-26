export async function POST(req: Request) {
  const { token, maxAgeSec = 60 * 60 } = await req.json(); // 기본 1시간

  const res = new Response(null, { status: 204 });
  res.headers.append(
    'Set-Cookie',
    `${encodeURIComponent('devseed_token')}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAgeSec}; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  );
  return res;
}
