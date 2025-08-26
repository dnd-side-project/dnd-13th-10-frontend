import axios from 'axios';

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://www.seedseed.site'
      : 'http://localhost:8080',
});

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  },
);
