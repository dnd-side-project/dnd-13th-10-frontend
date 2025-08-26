export async function POST() {
  const res = new Response(null, { status: 204 });
  res.headers.append(
    'Set-Cookie',
    `${encodeURIComponent('devseed_token')}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  );
  return res;
}
