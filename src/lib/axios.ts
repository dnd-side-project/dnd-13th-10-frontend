'use client';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`,
  withCredentials: true,
});

if (typeof window !== 'undefined') {
  // 동시 401 방지(한 번만 refresh 실행)
  let refreshPromise: Promise<Response> | null = null;
  async function refreshAccess(): Promise<Response> {
    if (!refreshPromise) {
      refreshPromise = fetch('/api/auth/refresh', {
        method: 'POST',
        cache: 'no-store',
      });
      refreshPromise.finally(() => {
        refreshPromise = null;
      });
    }
    return refreshPromise;
  }

  // /api/auth/refresh 시도 후 성공하면 원래 요청 자동 재시도
  http.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const config = (error.config || {}) as RetriableConfig;

      if (status === 401) {
        const url = config?.url ?? '';
        const isRefreshCall =
          url.includes('/api/auth/refresh') || url.includes('/auth/refresh');

        if (!config._retry && !isRefreshCall) {
          try {
            const r = await refreshAccess();
            if (!r.ok) throw new Error('refresh failed');

            config._retry = true;
            return http.request(config);
          } catch {
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
            return Promise.reject(error);
          }
        }

        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }

      return Promise.reject(error);
    },
  );
}
