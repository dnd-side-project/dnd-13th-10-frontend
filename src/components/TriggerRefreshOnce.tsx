'use client';
import { useEffect } from 'react';

export default function TriggerRefreshOnce() {
  useEffect(() => {
    fetch('/api/auth/refresh', { method: 'POST', cache: 'no-store' }).catch(
      () => {},
    );
  }, []);
  return null;
}
