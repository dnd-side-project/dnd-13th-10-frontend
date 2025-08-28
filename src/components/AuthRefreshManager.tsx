'use client';
import { useCallback, useEffect, useRef } from 'react';

/**
 *
 * @param leadSeconds 선제 리프레시 시간(초)
 * @returns
 */
export default function AuthRefreshManager({
  leadSeconds = 60,
}: {
  leadSeconds?: number;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setTimer = useCallback(
    (ms: number, schedule: () => void) => {
      clearTimer();
      timerRef.current = setTimeout(async () => {
        try {
          const r = await fetch('/api/auth/refresh', {
            method: 'POST',
            cache: 'no-store',
          });
          if (!r.ok) {
            if (typeof window !== 'undefined') window.location.assign('/login');
            return;
          }
        } finally {
          schedule(); // 갱신 후 다음 스케줄
        }
      }, ms);
    },
    [clearTimer],
  );

  const schedule = useCallback(async () => {
    try {
      const r = await fetch('/api/auth/token-info', { cache: 'no-store' });
      const j = await r.json();

      if (!j?.hasToken) return;
      if (!j?.expSec) {
        setTimer(30 * 60 * 1000, schedule);
        return;
      }
      const refreshAt = j.expSec * 1000 - leadSeconds * 1000;
      const waitMs = Math.max(5_000, refreshAt - Date.now());
      setTimer(waitMs, schedule);
    } catch {
      setTimer(60 * 1000, schedule);
    }
  }, [leadSeconds, setTimer]);

  useEffect(() => {
    schedule();
    return () => clearTimer();
  }, [schedule, clearTimer]);

  return null;
}
