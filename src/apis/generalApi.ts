import { ApiResponse, http } from '@/lib/axios';
import type { Company, SearchReq } from '@/types/generalTypes';
import type { MemoirType, QuestionType } from '@/types/memoirTypes';

// 면접 질문 카테고리 API
export const getQuestionCategories = async ({
  type,
  memoirType,
  condition,
  searchReq,
}: {
  type: QuestionType | string;
  memoirType: MemoirType | string;
  condition?: string;
  searchReq: SearchReq;
}): Promise<ApiResponse<string[]>> => {
  const response = await http.get('/api/question', {
    params: { type, memoirType, condition, searchReq },
  });

  return response.data;
};

// 회사 조회 API (검색어가 2글자 이상이여야 데이터를 가져옴)
export const getCompanyInfo = async ({
  keyword,
}: {
  keyword: string;
}): Promise<ApiResponse<Company>> => {
  const response = await http.get('/api/company/search', {
    params: { keyword },
  });

  return response.data;
};
