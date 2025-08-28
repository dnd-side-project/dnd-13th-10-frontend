import type { MemoirDetailResponse } from '@/types/memoirTypes';

export const mockMemoirDetailResponse: MemoirDetailResponse = {
  code: '200',
  message: '회고 상세 조회에 성공했습니다.',
  data: {
    id: 101,
    user: {
      name: '김개발',
    },
    scheduleId: 202,
    attachments: [
      {
        id: 1,
        originalName: '프론트엔드_포트폴리오_김개발.pdf',
        savedFileName: 'uuid_asdf1234.pdf',
        filePath: '/uploads/portfolio/uuid_asdf1234.pdf',
      },
    ],
    questions: [
      {
        id: 1,
        questionType: 'JOB',
        title: 'React의 가상 DOM(Virtual DOM)에 대해 설명해주세요.',
        answer:
          '가상 DOM은 실제 DOM의 복사본 같은 개념으로, UI 변경이 있을 때마다 실제 DOM을 직접 조작하는 대신 메모리에 있는 가상 DOM을 먼저 업데이트합니다. 이후 이전 가상 DOM과 비교하여 변경된 부분만 찾아내 실제 DOM에 한 번만 적용하는 방식으로 성능을 최적화합니다. 이를 재조정(Reconciliation)이라고 합니다.',
        displayOrder: 1,
      },
      {
        id: 2,
        questionType: 'EXPERIENCE',
        title:
          '팀 프로젝트 중 가장 어려웠던 갈등 상황과 해결 경험을 말씀해주세요.',
        answer:
          '디자이너와 특정 UI/UX 구현 방식에 대해 의견 차이가 있었습니다. 저는 기술적인 제약을, 디자이너는 사용자 경험을 우선시했습니다. 문제 해결을 위해 정기적으로 싱크업 미팅을 제안했고, 프로토타입을 함께 만들어보며 기술적 한계와 디자인 목표 사이의 최적의 타협점을 찾아 성공적으로 프로젝트를 마무리한 경험이 있습니다.',
        displayOrder: 2,
      },
      {
        id: 3,
        questionType: 'PERSONALITY',
        title: '우리 회사에 지원한 동기가 무엇인가요?',
        answer: null,
        displayOrder: 3,
      },
    ],
    type: 'INTERVIEW_MEMOIR',
    interviewFormat: '일대다',
    interviewMood: '편안함',
    satisfactionNote: '만족',
    interviewLevel: '중',
    interviewStatus: '최종합격',
    interviewMethod: '비대면',
    freeNote:
      '전반적으로 기술 질문의 깊이가 있었고, 팀 문화에 대한 질문도 많았습니다. 면접관분들이 지원자의 답변을 경청하고 편안한 분위기를 만들어주셔서 좋았습니다. 특히 Zustand를 사용한 상태 관리 경험에 대해 좋게 평가해주신 것 같습니다.',
    url: 'https://www.programmers.co.kr/job_positions/12345',
    companyName: '카카오',
    position: '프론트엔드 개발자',
    interviewStep: '2차 임원 면접',
    interviewDateTime: '2025-08-20T14:00:00Z',
    likeCount: 42,
    viewCount: 1024,
    createdAt: '2025-08-21T10:30:00Z',
    isTmp: false,
    isPublic: true,
  },
};
