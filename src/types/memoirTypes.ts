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
  question: string;
  order: number;
  questionType: QuestionType;
}

export interface UpdateQuestionRequest {
  id?: number;
  questionType: QuestionType | string;
  content: string;
  order: number;
}

// 퀵 회고 작성 요청
export interface CreateQuickMemoirsRequest {
  type: MemoirType;
  interviewFormat: InterviewFormat;
  interviewMood: InterviewMood;
  satisfactionNote: SatisfactionNote;
  interviewLevel: InterviewLevel;
  interviewMethod: InterviewMethod;
  freeNote: string;
  url: string;
  companyName: string;
  position: Position;
  interviewStep: InterviewStep;
  interviewDate: string;
  interviewTime: string;
  isPublic: boolean;
  questions: QuestionRequest[];
}

// 퀵 회고 수정 요청
export interface UpdateQuickMemoirsRequest {
  id: number;
  type: MemoirType | string;
  interviewFormat: InterviewFormat | string;
  interviewMood: InterviewMood | string;
  satisfactionNote: SatisfactionNote | string;
  interviewLevel: InterviewLevel | string;
  interviewMethod: InterviewMethod | string;
  freeNote: string;
  url: string;
  companyName: string;
  position: Position | string;
  interviewStep: InterviewStep | string;
  interviewDate: string;
  interviewTime: string;
  isPublic: boolean;
  questions: UpdateQuestionRequest[];
}

export interface Memoir {
  id: number;
  type: MemoirType | string;
  interviewStatus: InterviewStatus | string;
  companyName: string;
  position: Position | string;
  createdAt: string;
  firstQuestion: string;
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

export interface MemoirData {
  id: number;
  user: User;
  attachments: string | null;
  questions: Question[];
  type: MemoirType | string;
  interviewFormat: InterviewFormat | string;
  interviewMood: InterviewMood | string;
  satisfactionNote: SatisfactionNote | string;
  interviewLevel: InterviewLevel | string | null;
  interviewStatus: InterviewStatus | string;
  interviewMethod: InterviewMethod | string;
  freeNote: string;
  url: string;
  companyName: string;
  position: Position | string;
  interviewStep: InterviewStep | string;
  interviewDateTime: string;
  likeCount: number | null;
  viewCount: number | null;
  createdAt: string;
}

// 회고 상세 조회
export interface MemoirDetailResponse {
  code: string;
  message: string;
  data: MemoirData;
}
