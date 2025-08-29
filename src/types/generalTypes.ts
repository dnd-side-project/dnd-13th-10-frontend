import { MemoirType, QuestionType } from './memoirTypes';

// 면접 질문 카테고리에서의 쿼리 파라미터
export interface SearchReq {
  type: QuestionType | string;
  memoirType: MemoirType | string;
  condition: string;
  isMine?: boolean;
}

// 회사 조회
export interface Company {
  id: string;
  region: string;
  name: string;
  ceoName: string;
}
