import { INTERVIEW_STATUS, MEMOIR_TYPES, POSITION } from '@/constants/code';
import { Memoir } from '@/types/memoirTypes';

export const mockMemoirs: Memoir[] = [
  {
    id: 1,
    type: MEMOIR_TYPES.QUICK,
    interviewStatus: INTERVIEW_STATUS.PENDING,
    companyName: '네이버',
    position: POSITION.PLANNING_STRATEGY,
    createdAt: '2025-08-08',
    firstQuestion: '네이버 서비스 중 개선하고 싶은 점이 있다면?',
  },
  {
    id: 2,
    type: MEMOIR_TYPES.QUICK,
    interviewStatus: INTERVIEW_STATUS.PENDING,
    companyName: '배달의 민족',
    position: POSITION.DESIGN,
    createdAt: '2025-08-08',
    firstQuestion: '배달의 민족 앱의 UX에서 가장 중요하다고 생각하는 것은?',
  },
  {
    id: 3,
    type: MEMOIR_TYPES.QUICK,
    interviewStatus: INTERVIEW_STATUS.PENDING,
    companyName: '(주)실천',
    position: POSITION.DESIGN,
    createdAt: '2025-08-08',
    firstQuestion: '자신이 사용해본 서비스 중 가장 UI가 뛰어났던 것은?',
  },
  {
    id: 5,
    type: MEMOIR_TYPES.QUICK,
    interviewStatus: INTERVIEW_STATUS.PENDING,
    companyName: '당근',
    position: POSITION.DEVELOPMENT_DATA,
    createdAt: '2025-08-16',
    firstQuestion: '가상화가 무엇인가요?',
  },
  {
    id: 6,
    type: MEMOIR_TYPES.GENERAL,
    interviewStatus: INTERVIEW_STATUS.PASS,
    companyName: '(주)캐럿글로벌',
    position: POSITION.PLANNING_STRATEGY,
    createdAt: '2025-08-08',
    firstQuestion: '데이터를 기반으로 UX를 개선해본 경험이 있나요?',
  },
];
