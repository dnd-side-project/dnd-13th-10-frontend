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
  const refresh = sp.get('refresh');

  useEffect(() => {
    if (!token || postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const res = await fetch('/api/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            refreshToken: refresh ?? undefined,
          }),
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('set-token failed');

        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('token');
          url.searchParams.delete('refresh');
          window.history.replaceState({}, '', url.toString());
        }

        await fetchMyProfile();

        router.replace('/home');
      } catch (e) {
        clear();
        alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.' + e);
        router.replace('/');
      }
    })();
  }, [token, refresh, router, fetchMyProfile, clear]);

  return null;
}
