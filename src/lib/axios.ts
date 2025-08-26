import axios from 'axios';

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const http = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);
