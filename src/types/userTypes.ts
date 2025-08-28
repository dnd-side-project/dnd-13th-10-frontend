// 검색 기록 조회
export interface UserSearchHistory {
  userSearchHistId: number;
  content: string;
}

export interface UpdateProfilePayload {
  username?: string;
  profileImage?: File | null;
}

export interface MyMemoir {
  id: number;
  type: string;
  companyName: string;
  position: string;
  createdAt: string;
  isTmp: boolean;
  isPublic: boolean;
}

export interface GetMyMemoirsParams {
  searchType: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}
