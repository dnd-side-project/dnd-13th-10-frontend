export const PATH = {
  HOME: { path: '/home', label: '홈' },
  MY: { path: '/my-page', label: 'MY' },
  ALARM: { path: '/home/alarms', label: '알림' },

  QUESTIONS: {
    PERSONALITY: { path: '/home/questions/personality', label: '인성질문' },
    JOB: { path: '/home/questions/job', label: '직무질문' },
    EXPERIENCE: { path: '/home/questions/experience', label: '경험질문' },
    COMPANY: { path: '/home/questions/company', label: '회사질문' },
    FOLLOW_UP: { path: '/home/questions/follow_up', label: '꼬리질문' },
  },

  INTERVIEW: {
    SCHEDULE: { path: '/home/interview/schedule', label: '면접 일정 등록' },
  },

  COMMUNITY: {
    MAIN: { path: '/community', label: '커뮤니티' },
    JOB_FILTER: { path: '/community/job-filter', label: '직무필터' },
  },

  MEMOIR: {
    CREATE: { path: '/home/memoir/new', label: '회고 작성' },
    QUICK: { path: '/home/memoir/quick', label: '퀵회고' },
    GENERAL: { path: '/home/memoir/general', label: '일반회고' },
    DETAIL: { path: '/home/memoir/[id]', label: '회고 상세' },
    HOT: { path: '/home/memoir/hot', label: '이번주 HOT 회고' },
    EDIT: { path: '/home/memoir/[id]/edit', label: '회고 수정' },
  },

  MY_PAGE: {
    PROFILE_MODIFY: { path: '/my-page/profile-modify', label: '프로필 수정' },
    MEMOIRS: { path: '/my-page/memoirs', label: '나의 회고' },
    TEMP_SAVED: { path: '/my-page/temp-saved', label: '임시 저장한 글' },
    LIKE: { path: '/my-page/likes', label: '내가 좋아요한 글' },
    COMMENTS: { path: '/my-page/comments', label: '내가 댓글 남긴 글' },
    SCRAP: { path: '/my-page/scrap', label: '내가 스크랩한 글' },
  },

  SCHEDULE: {
    HOME: { path: '/schedule', label: '일정' },
    NEW: { path: '/schedule/new', label: '면접 일정 등록' },
    DETAIL: { path: '/schedule/[id]', label: '일정 상세' },
    EDIT: { path: '/schedule/[id]/edit', label: '일정 수정' },
  },
} as const;
