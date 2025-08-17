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
    !interviewInfo.interviewerCount ||
    !interviewInfo.interviewMethod ||
    !interviewInfo.interviewMood
  ) {
    return false;
  }

  const { questions } = formData;
  if (
    questions.length === 0 ||
    !questions.every(q => q.type && q.content && q.answer)
  ) {
    return false;
  }

  const { interviewReview } = formData;

  if (
    !interviewReview.interviewLevel ||
    !interviewReview.interviewStatus ||
    !interviewReview.visibility
  ) {
    return false;
  }

  return true;
};
