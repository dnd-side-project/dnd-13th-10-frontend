export const PATH = {
  HOME: { path: '/home', label: '홈' },
  CALENDAR: { path: '/calendar', label: '일정' },
  COMMUNITY: { path: '/community', label: '커뮤니티' },
  MY: { path: '/my-page', label: 'MY' },
  ALARM: { path: '/home/alarms', label: '알림' },

  QUESTIONS: {
    PERSONALITY: { path: '/home/questions/personality', label: '인성질문' },
    JOB: { path: '/home/questions/job', label: '직무질문' },
    EXPERIENCE: { path: '/home/questions/experience', label: '경험질문' },
    COMPANY: { path: '/home/questions/company', label: '회사질문' },
    FOLLOW_UP: { path: '/home/questions/follow-up', label: '꼬리질문' },
  },

  INTERVIEW: {
    SCHEDULE: { path: '/home/interview/schedule', label: '면접 일정 등록' },
  },

  MEMOIR: {
    CREATE: { path: '/home/memoir/new', label: '회고 작성' },
    QUICK: { path: '/home/memoir/quick', label: '퀵회고' },
    GENERAL: { path: '/home/memoir/general', label: '일반회고' },
  },
} as const;
