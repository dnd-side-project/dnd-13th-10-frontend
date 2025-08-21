import type { ScheduleCreate } from '@/types/scheduleTypes';

/**
 * @param formData - 검사할 폼 데이터 객체
 * @returns 모든 필드가 유효하면 true, 하나라도 비어있으면 false
 */
export const isScheduleFormValid = (formData: ScheduleCreate): boolean => {
  const requiredFields: (keyof ScheduleCreate)[] = [
    'companyName',
    'position',
    'interviewDateTime',
    'location',
    'interviewStep',
  ];

  return requiredFields.every(field => {
    const value = formData[field];
    return value !== null && value !== undefined && value !== '';
  });
};
