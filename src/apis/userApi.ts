import { ApiResponse, http, internal } from '@/lib/axios';
import {
  GetMyMemoirsParams,
  MyMemoir,
  UpdateProfilePayload,
  UserSearchHistory,
} from '@/types/userTypes';

// 사용자 검색 기록 조회 API
export const getUserSearchHistory = async (): Promise<
  ApiResponse<UserSearchHistory[]>
> => {
  const response = await http.get('/user/hist');

  return response.data;
};

// 사용자 검색 기록 삭제 API
export const deleteUserSearchHistory = async (
  id: number,
): Promise<ApiResponse<void>> => {
  const response = await http.delete(`/user/hist/${id}`);

  return response.data;
};

// 사용자 검색 기록 전체 삭제 API
export const deleteAllUserSearchHistory = async (): Promise<
  ApiResponse<void>
> => {
  const response = await http.delete('/user/hist/all');

  return response.data;
};

// 로그아웃 API
export const logout = async (): Promise<ApiResponse<void>> => {
  const response = await internal.post('/auth/logout');

  return response.data;
};

// 탈퇴 API
export const deleteAccount = async (): Promise<ApiResponse<void>> => {
  const response = await internal.patch('/auth/withdraw');

  return response.data;
};

// 프로필 수정 API

export const updateProfile = async ({
  username,
  profileImage,
}: UpdateProfilePayload) => {
  const form = new FormData();

  if (username) {
    form.append(
      'request',
      new Blob([JSON.stringify({ username })], { type: 'application/json' }),
    );
  }

  if (profileImage) {
    form.append('profileImage', profileImage);
  }

  const res = await http.patch('/users/update-profile', form, {
    headers: { 'Content-Type': undefined },
  });
  return res.data;
};

// 나의 회고 가져오기
export const getMyMemoirs = async (params: GetMyMemoirsParams) => {
  const response = await http.post<ApiResponse<MyMemoir[]>>('/memoirs/mine', {
    request: { searchType: params.searchType },
  });
  return response.data;
};
