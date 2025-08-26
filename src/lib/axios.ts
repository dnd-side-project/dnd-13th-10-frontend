import axios from 'axios';

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  },
);
