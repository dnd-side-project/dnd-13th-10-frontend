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

export type MemoirType = (typeof MEMOIR_TYPES)[keyof typeof MEMOIR_TYPES];
export type InterviewFormat =
  (typeof INTERVIEW_FORMAT)[keyof typeof INTERVIEW_FORMAT];
export type InterviewLevel =
  (typeof INTERVIEW_LEVEL)[keyof typeof INTERVIEW_LEVEL];
export type InterviewMethod =
  (typeof INTERVIEW_METHOD)[keyof typeof INTERVIEW_METHOD];
export type InterviewMood =
  (typeof INTERVIEW_MOOD)[keyof typeof INTERVIEW_MOOD];
export type InterviewStatus =
  (typeof INTERVIEW_STATUS)[keyof typeof INTERVIEW_STATUS];
export type InterviewStep =
  (typeof INTERVIEW_STEP)[keyof typeof INTERVIEW_STEP];
export type Position = (typeof POSITION)[keyof typeof POSITION];
export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];
export type SatisfactionNote =
  (typeof SATISFACTION_NOTE)[keyof typeof SATISFACTION_NOTE];

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
