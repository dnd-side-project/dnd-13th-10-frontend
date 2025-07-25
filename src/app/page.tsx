'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      {status === 'authenticated' ? (
        <>
          <p>Welcome, {session?.user?.name}</p>
          <button
            className="flex gap-5 rounded-lg bg-amber-400 p-5 text-blue-500"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn('github')}>Sign In with GitHub</button>
          <br />
          <button onClick={() => signIn('kakao')}>Sign In with Kakao</button>
          <br />
          <button onClick={() => signIn('naver')}>Sign In with Naver</button>
        </>
      )}
    </div>
  );
}
