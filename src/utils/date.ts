import type { TimeValue } from '@/components/ui/picker/TimePicker';

export const formatTime = (time: TimeValue | null): string => {
  if (!time) return '';
  const minute = String(time.minute).padStart(2, '0');
  return `${time.meridiem} ${time.hour}:${minute}`;
};

export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * ISO 문자열을 TimeValue로 변환합니다.
 * @param isoString ISO 문자열
 * @returns TimeValue 객체 또는 undefined
 */
export const convertISOToTimeValue = (
  isoString?: string,
): TimeValue | undefined => {
  if (!isoString) return undefined;
  const date = new Date(isoString);
  let hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? '오후' : '오전';
  hour %= 12;
  hour = hour || 12;

  return { meridiem, hour, minute };
};

export const formatDateToYYMMDDHHMM = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const pad = (num: number) => String(num).padStart(2, '0');

  const year = dateObj.getFullYear().toString().slice(-2);
  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
};

/**
 * 면접 일정 카드용으로 날짜를 포맷 (예: { date: '08.25', time: '14:00' })
 * @param isoString ISO 날짜 문자열
 * @returns 날짜와 시간 객체
 */
export const formatScheduleDate = (isoString: string) => {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return {
    date: `${month}.${day}`,
    time: `${hours}:${minutes}`,
  };
};

/**
 * D-Day를 계산합니다.
 * @param interviewDate 면접 날짜 ISO 문자열
 * @returns 남은 일수
 */
export const calculateRemainDate = (interviewDate: string) => {
  const today = new Date(); // 실제 현재 날짜를 기준으로 계산
  const interviewD = new Date(interviewDate);

  // 시간을 제외하고 날짜 기준으로만 계산하기 위해 자정으로 설정
  today.setHours(0, 0, 0, 0);
  interviewD.setHours(0, 0, 0, 0);

  const diffTime = interviewD.getTime() - today.getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * 주어진 날짜가 오늘로부터 며칠 전인지 계산합니다.
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns "오늘" 또는 "N일 전" 형태의 문자열
 */
export const calculateDaysAgo = (dateString: string) => {
  const today = new Date();
  const createdDate = new Date(dateString);

  // 시간을 제외하고 날짜 기준으로만 계산
  today.setHours(0, 0, 0, 0);
  createdDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - createdDate.getTime();

  // 만약 생성된 날짜가 오늘보다 미래라면 0을 반환 (오류 방지)
  if (diffTime < 0) return '오늘';

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '오늘';
  }
  return `${diffDays}일 전`;
};

/**
 * 날짜 문자열(YYYY-MM-DD)을 YY.MM.DD 형식으로 변환하는 함수
 * @param dateString - 변환할 날짜 문자열
 */
export const formatDateToYYMMDD = (dateString: string) => {
  return dateString.substring(2).replace(/-/g, '.');
};

/**
 * 주어진 날짜가 현재로부터 얼마나 지났는지에 따라 "방금 전", "N분 전", "N시간 전", "N일 전" 등으로 변환합니다.
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns "방금 전", "N분 전", "N시간 전", "N일 전" 형태의 문자열
 */
export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffInMs = now.getTime() - pastDate.getTime();

  if (diffInMs < 0) {
    return '방금 전';
  }

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return '방금 전';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }
  return `${diffInDays}일 전`;
};
