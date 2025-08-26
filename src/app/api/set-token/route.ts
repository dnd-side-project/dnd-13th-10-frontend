export async function POST(req: Request) {
  const { token } = await req.json();

  const res = new Response(null, { status: 204 });
  res.headers.append(
    'Set-Cookie',
    `${encodeURIComponent('devseed_token')}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  );
  return res;
}
