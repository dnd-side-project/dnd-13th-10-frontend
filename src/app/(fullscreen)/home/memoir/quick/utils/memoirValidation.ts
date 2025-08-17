import type { MemoirFormData } from '../store/memoirFormStore';

export const isStepValid = (currentStep: number, formData: MemoirFormData) => {
  switch (currentStep) {
    case 1: {
      const {
        companyName,
        position,
        interviewDate,
        interviewTime,
        interviewerCount,
      } = formData.step1;
      return !!(
        companyName &&
        position &&
        interviewDate &&
        interviewTime &&
        interviewerCount
      );
    }
    case 2: {
      const { interviewMood, satisfaction } = formData.step2;
      return !!(interviewMood && satisfaction);
    }
    case 3: {
      const { step3: questions } = formData;
      return questions.every(q => q.type && q.content);
    }
    case 4: {
      const { notes, result, visibility } = formData.step4;
      return !!(notes && result && visibility);
    }
    default:
      return false;
  }
};
