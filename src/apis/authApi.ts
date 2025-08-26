import { ApiResponse, http } from '@/lib/axios';

interface Token {
  accessToken: string;
}

// 토큰 재발급 API
export const refreshToken = async (): Promise<ApiResponse<Token>> => {
  const response = await http.post('/auth/refresh');

  return response.data;
};

// 로그아웃 API
export const logout = async (): Promise<ApiResponse<void>> => {
  const response = await http.post('/auth/logout');

  return response.data;
};
