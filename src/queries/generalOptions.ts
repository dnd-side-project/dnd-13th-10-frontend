import { queryOptions } from '@tanstack/react-query';

import * as generalApi from '@/apis/generalApi';
import type { SearchReq } from '@/types/generalTypes';
import type { MemoirType, QuestionType } from '@/types/memoirTypes';

import { generalKeys } from './queryKeys';

// GET
export const generalQueries = {
  companyInfo: (keyword: string) =>
    queryOptions({
      queryKey: generalKeys.company(keyword),
      queryFn: () => generalApi.getCompanyInfo({ keyword }),
      enabled: keyword.length >= 2, // 2글자 이상일 때만 요청
    }),
  questionCategories: (params: {
    type: QuestionType | string;
    memoirType: MemoirType | string;
    condition?: string;
    searchReq: SearchReq;
  }) =>
    queryOptions({
      queryKey: generalKeys.questionCategories(params),
      queryFn: () => generalApi.getQuestionCategories(params),
    }),
};
