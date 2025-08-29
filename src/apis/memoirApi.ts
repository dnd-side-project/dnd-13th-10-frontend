import { ApiResponse, http } from '@/lib/axios';
import type {
  BookmarkToggleResponse,
  HotMemoir,
  LikeToggleResponse,
  Memoir,
  MemoirData,
  MemoirsRequest,
  PaginatedCommentList,
  PaginatedMemoirData,
  PaginatedMemoirListData,
} from '@/types/memoirTypes';

// 회고 리스트 조회 API (퀵/일반 모두 조회)
export const getAllMemoirs = async ({
  position,
  cursor,
  size,
}: {
  position?: string;
  cursor?: string | null;
  size?: number;
}): Promise<ApiResponse<PaginatedMemoirListData>> => {
  const response = await http.get('/memoirs', {
    params: {
      position,
      cursor,
      size,
    },
  });

  return response.data;
};

// 회고 수정 API (퀵/일반 모두 수정)
export const updateMemoir = async (
  data: Partial<MemoirsRequest>,
): Promise<ApiResponse<MemoirsRequest>> => {
  const response = await http.put('/memoirs', data);

  return response.data;
};

// 회고 등록 API
export const createMemoir = async (
  data: MemoirsRequest,
): Promise<ApiResponse<MemoirsRequest>> => {
  const response = await http.post('/memoirs', data);

  return response.data;
};

// 회고 상세 조회 API
export const getMemoirDetails = async (
  memoirId: number,
  cookie?: string,
): Promise<ApiResponse<MemoirData>> => {
  const response = await http.get(`/memoirs/${memoirId}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
};

// 회고 삭제 API
export const deleteMemoir = async (
  memoirId: number,
): Promise<ApiResponse<void>> => {
  const response = await http.delete(`/memoirs/${memoirId}`);

  return response.data;
};

// 내가 작성한 회고 리스트 조회 API
export const getMyMemoirs = async (
  searchType: string,
): Promise<ApiResponse<Memoir[]>> => {
  const response = await http.get('/memoirs/mine', {
    params: {
      searchType: searchType,
    },
  });

  return response.data;
};

// 내가 임시저장한 회고 리스트 조회 API
export const getMyTmpMemoirs = async (): Promise<ApiResponse<Memoir[]>> => {
  const response = await http.get('/memoirs/mine/tmp');

  return response.data;
};

// 내가 좋아요를 한 회고 글 조회 API
export const getMyLikedMemoirs = async ({
  cursor,
  size,
}: {
  cursor?: string | null;
  size?: number;
}): Promise<ApiResponse<PaginatedMemoirData>> => {
  const response = await http.get('/memoirs/liked', {
    params: {
      cursor,
      size,
    },
  });

  return response.data;
};

// 핫 회고 조회 API
export const getHotMemoirs = async (): Promise<ApiResponse<HotMemoir[]>> => {
  const response = await http.get('/memoirs/hot');

  return response.data;
};

// 내가 댓글을 작성한 회고 글 조회 API
export const getMyCommentedMemoirs = async ({
  cursor,
  size,
}: {
  cursor?: string | null;
  size?: number;
}): Promise<ApiResponse<PaginatedMemoirData>> => {
  const response = await http.get('/memoirs/commented', {
    params: {
      cursor,
      size,
    },
  });

  return response.data;
};

// 내가 북마크를 한 회고 글 조회 API
export const getMyBookmarkedMemoirs = async ({
  cursor,
  size,
}: {
  cursor?: string | null;
  size?: number;
}): Promise<ApiResponse<PaginatedMemoirData>> => {
  const response = await http.get('/memoirs/bookMarked', {
    params: {
      cursor,
      size,
    },
  });

  return response.data;
};

// 좋아요 토글 API
export const toggleLikeMemoir = async (
  memoirId: number,
): Promise<ApiResponse<LikeToggleResponse>> => {
  const response = await http.post(`/memoirs/${memoirId}/likes`);

  return response.data;
};

// 댓글 목록 조회 API
export const getMemoirComments = async ({
  memoirId,
  cursor,
  size,
}: {
  memoirId: number;
  cursor?: string | null;
  size?: number;
}): Promise<ApiResponse<PaginatedCommentList>> => {
  const response = await http.get(`/memoirs/${memoirId}/comments`, {
    params: {
      cursor,
      size,
    },
  });

  return response.data;
};

// 댓글 작성 API
export const createMemoirComment = async ({
  memoirId,
  content,
  parentCommentId,
}: {
  memoirId: number;
  content: string;
  parentCommentId?: number;
}): Promise<ApiResponse<void>> => {
  const response = await http.post(`/memoirs/${memoirId}/comments`, {
    content,
    parentCommentId,
  });

  return response.data;
};

// 북마크 토글 API
export const toggleBookmarkMemoir = async (
  memoirId: number,
): Promise<ApiResponse<BookmarkToggleResponse>> => {
  const response = await http.post(`/memoirs/${memoirId}/bookMarks`);

  return response.data;
};
