import type { TimeValue } from '@/components/ui/picker2/TimePicker';

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
