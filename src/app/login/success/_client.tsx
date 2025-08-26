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
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          router.replace('/');
          return;
        }
        router.replace('/home');
      } catch (e) {
        console.log(e);
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        router.replace('/');
      }
    })();
  }, [token, router]);

  return <div></div>;
}
