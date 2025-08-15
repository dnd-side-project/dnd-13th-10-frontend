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

type ValueOf<T> = T[keyof T];

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

// 퀵 회고 작성 요청
export interface CreateQuickMemoirsRequest {
  type: MemoirType;
  interviewFormat: InterviewFormat;
  interviewMood: InterviewMood;
  satisfactionNote: SatisfactionNote;
  interviewMethod: InterviewMethod;
  freeNote: string;
  url: string;
  companyName: string;
  position: Position;
  interviewStep: InterviewStep;
  interviewDate: string;
  interviewTime: string;
  questions: QuestionRequest[];
}

export interface QuickMemoir {
  id: number;
  type: MemoirType;
  interviewStatus: InterviewStatus;
  interviewMethod: InterviewMethod;
  companyName: string;
  position: Position;
  createdAt: string;
  firstQuestion: string;
}

// 퀵 회고 조회
export interface QuickMemoirsResponse {
  code: string;
  message: string;
  data: QuickMemoir[];
}
