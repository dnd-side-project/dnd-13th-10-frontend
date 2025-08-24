import type { ScheduleDetailData } from '@/types/scheduleTypes';

export const mockScheduleList: ScheduleDetailData[] = [
  {
    id: 1,
    companyName: '네이버',
    position: '프론트엔드 개발자',
    interviewDate: '2025-08-25T14:00:00.000Z',
    interviewStep: '1차 면접',
    location: '네이버 그린팩토리',
  },
  {
    id: 2,
    companyName: '카카오',
    position: '백엔드 개발자',
    interviewDate: '2025-08-30T16:30:00.000Z',
    interviewStep: '2차 면접',
    location: '온라인 (Google Meet)',
  },
  {
    id: 3,
    companyName: '토스',
    position: '서버 개발자',
    interviewDate: '2025-09-01T10:00:00.000Z',
    interviewStep: '최종 면접',
    location: '아크플레이스',
  },
  {
    id: 4,
    companyName: '쿠팡',
    position: '프로덕트 오너',
    interviewDate: '2025-08-11T11:00:00.000Z',
    interviewStep: '2차 면접',
    location: '쿠팡 본사',
  },
  {
    id: 5,
    companyName: '당근',
    position: 'iOS 개발자',
    interviewDate: '2025-09-05T15:00:00.000Z',
    interviewStep: '1차 면접',
    location: '온라인 (Zoom)',
  },
  {
    id: 6,
    companyName: '우아한형제들',
    position: '안드로이드 개발자',
    interviewDate: '2025-08-28T10:00:00.000Z',
    interviewStep: '1차 면접',
    location: '롯데월드타워',
  },
];
