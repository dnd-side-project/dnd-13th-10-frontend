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
