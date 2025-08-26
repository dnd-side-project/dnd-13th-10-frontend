'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginSuccess() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = sp.get('token');
    if (!token) return;

    fetch('/api/set-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).then(() => {
      router.push('/home');
    });
  }, [sp, router]);

  return <></>;
}
