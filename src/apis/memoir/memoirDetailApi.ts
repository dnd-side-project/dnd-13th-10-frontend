import { mockMemoirDetailResponse } from '@/app/(fullscreen)/home/memoir/[slug]/mocks/mockMemoirDetailResponse';
import type { MemoirDetailResponse } from '@/types/memoirTypes';

export async function getMemoirDetail(
  _id: string,
): Promise<MemoirDetailResponse> {
  // const response = await axios.get(`/memoirs/${id}`);
  // return response.data

  return mockMemoirDetailResponse;
}
