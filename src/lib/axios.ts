import axios from 'axios';

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000'
      : 'https://www.seedseed.site',
});

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  },
);
