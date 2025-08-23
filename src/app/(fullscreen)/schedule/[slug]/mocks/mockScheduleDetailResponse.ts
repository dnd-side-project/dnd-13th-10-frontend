import type { ScheduleDetailResponse } from '@/types/scheduleTypes';

export const mockScheduleDetailResponse: ScheduleDetailResponse = {
  code: '200',
  message: '일정 상세 조회에 성공했습니다.',
  data: {
    id: 1,
    companyName: '네이버',
    position: '프론트엔드 개발자',
    interviewDate: '2025-08-25T14:00:00.000Z',
    interviewStep: '1차 면접',
    location: '경기도 성남시 분당구 불정로 6 네이버 그린팩토리',
  },
};
