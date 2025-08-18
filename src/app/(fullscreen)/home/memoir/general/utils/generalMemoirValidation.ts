import type { GeneralMemoirFormData } from '../store/generalMemoirFormStore';

export const isGeneralMemoirFormValid = (
  formData: GeneralMemoirFormData,
): boolean => {
  const { interviewInfo } = formData;
  if (
    !interviewInfo.companyName ||
    !interviewInfo.interviewDate ||
    !interviewInfo.interviewTime ||
    !interviewInfo.position ||
    !interviewInfo.interviewStep ||
    !interviewInfo.interviewFormat ||
    !interviewInfo.interviewMethod ||
    !interviewInfo.interviewMood
  ) {
    return false;
  }

  const { questions } = formData;
  if (
    questions.length === 0 ||
    !questions.every(q => q.questionType && q.content && q.answer)
  ) {
    return false;
  }

  const { interviewReview } = formData;
  if (
    !interviewReview.interviewLevel ||
    !interviewReview.satisfactionNote ||
    !interviewReview.interviewStatus
  ) {
    return false;
  }

  return true;
};
