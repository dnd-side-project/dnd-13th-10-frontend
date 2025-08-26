import {
  MEMOIR_TYPES,
  INTERVIEW_FORMAT,
  INTERVIEW_LEVEL,
  INTERVIEW_METHOD,
  INTERVIEW_MOOD,
  INTERVIEW_STATUS,
  INTERVIEW_STEP,
  POSITION,
  QUESTION_TYPE,
  SATISFACTION_NOTE,
} from '@/constants/code';

export type ValueOf<T> = T[keyof T];

export type MemoirType = ValueOf<typeof MEMOIR_TYPES>;
export type InterviewFormat = ValueOf<typeof INTERVIEW_FORMAT>;
export type InterviewLevel = ValueOf<typeof INTERVIEW_LEVEL>;
export type InterviewMethod = ValueOf<typeof INTERVIEW_METHOD>;
export type InterviewMood = ValueOf<typeof INTERVIEW_MOOD>;
export type InterviewStatus = ValueOf<typeof INTERVIEW_STATUS>;
export type InterviewStep = ValueOf<typeof INTERVIEW_STEP>;
export type Position = ValueOf<typeof POSITION>;
export type QuestionType = ValueOf<typeof QUESTION_TYPE>;
export type SatisfactionNote = ValueOf<typeof SATISFACTION_NOTE>;

export interface QuestionRequest {
  id?: number;
  questionType: QuestionType | string;
  title: string;
  content: string;
  order: number;
}

// 회고 수정/작성 요청
export interface MemoirsRequest {
  id: number;
  userId: number;
  scheduleId?: number;
  type: MemoirType | string;
  interviewFormat: InterviewFormat | string;
  interviewMood: InterviewMood | string;
  satisfactionNote: SatisfactionNote | string;
  interviewLevel: InterviewLevel | string;
  interviewStatus: InterviewStatus | string;
  interviewMethod: InterviewMethod | string;
  freeNote?: string;
  url?: string;
  companyName: string;
  position: Position | string;
  interviewStep: InterviewStep | string;
  interviewDate: string;
  interviewTime: string;
  public: boolean;
  tmp: boolean;
  isTmp: boolean;
  isPublic: boolean;
  questions: QuestionRequest[];
}

export interface Memoir {
  id: number;
  type: MemoirType | string;
  interviewStatus: InterviewStatus | string;
  companyName: string;
  position: Position | string;
  createdAt: string;
  firstQuestion: string;
  isTmp?: boolean;
  isPublic?: boolean;
}

export type ApiMemoirItem = Omit<
  Memoir,
  'interviewStatus' | 'firstQuestion' | 'isTmp' | 'isPublic'
>;

export interface PaginatedMemoirData {
  pageSize: number;
  nextCursor: string | null;
  hasNext: boolean;
  result: ApiMemoirItem[];
}

// 회고 리스트 조회
export interface MemoirsResponse {
  code: string;
  message: string;
  data: Memoir[];
}

export interface User {
  name: string;
}

export interface Question {
  id: number;
  questionType: QuestionType | string;
  content: string;
  answer?: string | null;
  displayOrder: number;
}

export interface Attachment {
  id: number;
  originalName?: string;
  savedFileName?: string;
  filePath: string;
}

export interface MemoirData {
  id: number;
  user: User;
  scheduleId?: number;
  attachments?: Attachment[] | null;
  questions: Question[];
  type: MemoirType | string;
  interviewFormat: InterviewFormat | string;
  interviewMood: InterviewMood | string;
  satisfactionNote?: SatisfactionNote | string;
  interviewLevel: InterviewLevel | string | null;
  interviewStatus: InterviewStatus | string;
  interviewMethod?: InterviewMethod | string;
  freeNote?: string;
  url?: string;
  companyName: string;
  position: Position | string;
  interviewStep?: InterviewStep | string;
  interviewDateTime: string;
  likeCount: number | null;
  viewCount: number | null;
  createdAt: string;
  isTmp: boolean;
  isPublic: boolean;
}

// 회고 상세 조회
export interface MemoirDetailResponse {
  code: string;
  message: string;
  data: MemoirData;
}

// 핫 회고
export interface HotMemoir {
  id: number;
  type: MemoirType | string;
  userName: string;
  companyName: string;
  position: Position | string;
  interviewStatus?: InterviewStatus | string;
  firstQuestion: string;
  imageUrl?: string;
  createdAt: string;
  weeklyViewCount: number;
  totalViewCount: number;
}

export interface HotMemoirsResponse {
  code: string;
  message: string;
  data: HotMemoir[];
}

// 회고 임시저장 응답
export interface TmpMemoirSaveResponse {
  memoirId: number;
}

// 좋아요 토글
export interface LikeToggleResponse {
  isLiked: boolean;
  toggledAt: string;
}

// 댓글
export interface Comment {
  id: number;
  content: string;
  author: string;
  profileImageUrl: string;
  createdAt: string;
}

// 북마크 토글
export interface BookmarkToggleResponse {
  bookMarked: boolean;
  toggledAt: string;
}
