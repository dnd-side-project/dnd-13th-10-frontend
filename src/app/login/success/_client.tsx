'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginSuccessClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const postedRef = useRef(false);

  const token = sp.get('token');

  useEffect(() => {
    if (!token || postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const res = await fetch('/api/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          return;
        }
        router.replace('/home');
      } catch (e) {
        alert(e);
      }
    })();
  }, [token, router]);

  return <div></div>;
}
