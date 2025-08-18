// 회고 타입
export const MEMOIR_TYPES = {
  QUICK: '10',
  GENERAL: '20',
} as const;

// 면접 형식
export const INTERVIEW_FORMAT = {
  ONE_ON_ONE: '10',
  ONE_ON_MANY: '20',
  MANY_ON_MANY: '30',
  MANY_ON_ONE: '40',
} as const;

// 면접 분위기
export const INTERVIEW_MOOD = {
  PRESSURING: '10',
  COMFORTABLE: '20',
  QUIET: '30',
  SHARP: '40',
  FRIENDLY: '50',
} as const;

// 면접 만족도
export const SATISFACTION_NOTE = {
  SATISFIES: '10',
  NEUTRAL: '20',
  DISSATISFIED: '30',
} as const;

// 난이도
export const INTERVIEW_LEVEL = {
  VERY_EASY: '10',
  EASY: '20',
  NORMAL: '30',
  HARD: '40',
  VERY_HARD: '50',
} as const;

// 면접 방식
export const INTERVIEW_METHOD = {
  FACE_TO_FACE: '10',
  NON_FACE_TO_FACE: '20',
} as const;

// 면접 상태
export const INTERVIEW_STATUS = {
  PASS: '10',
  FAIL: '20',
  PENDING: '30',
} as const;

// 면접 단계
export const INTERVIEW_STEP = {
  FIRST_INTERVIEW: '10',
  SECOND_INTERVIEW: '20',
  FINAL_INTERVIEW: '30',
  PHONE_INTERVIEW: '40',
} as const;

// 직무
export const POSITION = {
  PLANNING_STRATEGY: '10',
  MARKETING_PR: '11',
  ACCOUNTING_FINANCE: '12',
  HR: '13',
  ADMIN_LEGAL: '14',
  DEVELOPMENT_DATA: '20',
  DESIGN: '21',
  SALES_CUSTOMER: '30',
  PURCHASE_LOGISTICS: '31',
  DRIVING_DELIVERY: '32',
  SERVICE: '40',
  CONSTRUCTION_ARCHITECTURE: '50',
  FINANCE_INSURANCE: '60',
  PUBLIC_WELFARE: '70',
} as const;

// 질문 타입
export const QUESTION_TYPE = {
  PERSONALITY: '10',
  JOB: '20',
  EXPERIENCE: '30',
  COMPANY: '40',
  FOLLOW_UP: '50',
} as const;
// export const QUESTION_TYPE = {
//   ANALYTICAL_THINKING: '10',
//   FORESIGHT: '11',
//   ORGANIZATION: '12',
//   NEGOTIATION: '20',
//   PRESENTATION: '21',
//   TECHNICAL_EXPERTISE: '30',
//   LEADERSHIP: '31',
//   COACHING: '32',
//   BUSINESS_ACUMEN: '40',
//   DESIGN_SKILL: '41',
//   BUDGETING: '42',
//   PROJECT_MANAGEMENT: '43',
//   WORK_ORGANIZATION: '44',
//   PROBLEM_SOLVING: '50',
//   DECISIVENESS: '51',
//   RESULT_ORIENTATION: '52',
//   DECISION_MAKING: '53',
//   COMPUTER_LITERACY: '60',
//   COMMUNICATION: '61',
//   TEAMWORK: '62',
//   ADAPTABILITY: '63',
//   CREATIVITY: '64',
//   CODING_SKILL: '70',
//   SYSTEM_DESIGN: '71',
//   ALGORITHM_PROBLEM_SOLVING: '72',
//   DEBUGGING: '73',
//   SOFTWARE_ARCHITECTURE: '74',
//   VERSION_CONTROL: '75',
//   SECURITY_AWARENESS: '76',
// } as const;
