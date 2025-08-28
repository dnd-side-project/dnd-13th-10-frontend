'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function LoginSuccessClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const postedRef = useRef(false);

  const fetchMyProfile = useUserStore(s => s.fetchMyProfile);
  const clear = useUserStore(s => s.clear);

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
        await fetchMyProfile();
        router.replace('/home');
      } catch (e) {
        clear();
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.' + e);
        router.replace('/');
      }
    })();
  }, [token, router, fetchMyProfile, clear]);

  return <div></div>;
}
