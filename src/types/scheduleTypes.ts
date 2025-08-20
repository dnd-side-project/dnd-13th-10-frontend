import { InterviewStep, MemoirType, Position } from './memoirTypes';

// 일정 단건
export interface Schedule {
  id: number;
  companyName: string;
  position: Position | string;
  interviewDate: string;
  interviewStep: InterviewStep | string;
  remainDate?: number;
  memoirTypes?: MemoirType[] | string[];
  createdAt: string;
}

// 일정 목록
export interface ScheduleData {
  code: string;
  message: string;
  data: Schedule[];
}

// 일정 생성
export interface ScheduleCreate {
  companyName: string;
  position: Position | string;
  interviewDateTime: string;
  location: string;
  interviewStep: InterviewStep | string;
}
