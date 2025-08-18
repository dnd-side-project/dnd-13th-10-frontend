import type { MemoirFormData } from '../store/memoirFormStore';

export const isStepValid = (
  currentStep: number,
  formData: MemoirFormData,
): boolean => {
  switch (currentStep) {
    case 1: {
      const {
        companyName,
        position,
        interviewDate,
        interviewTime,
        interviewFormat,
      } = formData.step1;
      return !!(
        companyName &&
        position &&
        interviewDate &&
        interviewTime &&
        interviewFormat
      );
    }
    case 2: {
      const { interviewMood, satisfactionNote } = formData.step2;
      return !!(interviewMood && satisfactionNote);
    }
    case 3: {
      const { step3: questions } = formData;
      return (
        questions.length > 0 &&
        questions.every(q => q.questionType && q.content)
      );
    }
    case 4: {
      const { interviewStatus } = formData.step4;
      return !!interviewStatus;
    }
    default:
      return false;
  }
};
