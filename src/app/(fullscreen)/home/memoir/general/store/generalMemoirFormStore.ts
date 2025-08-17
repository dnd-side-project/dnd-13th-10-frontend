import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';

export interface QuestionItem {
  id: string;
  type: string;
  content: string;
  answer: string;
}

interface InterviewInfoData {
  companyName: string;
  interviewDate: Date | null;
  interviewTime: TimeValue | null;
  position: string;
  interviewStep: string;
  interviewerCount: string;
  interviewMethod: string;
  interviewMood: string;
}

interface InterviewReviewData {
  interviewLevel: string;
  satisfactionNote: string;
  freeNote: string;
  interviewStatus: string;
  visibility: 'private' | 'public';
}

interface ReferenceData {
  url: string;
}

export interface GeneralMemoirFormData {
  interviewInfo: InterviewInfoData;
  questions: QuestionItem[];
  interviewReview: InterviewReviewData;
  references: ReferenceData;
}

interface GeneralMemoirFormState {
  formData: GeneralMemoirFormData;
  updateFormData: <K extends keyof GeneralMemoirFormData>(
    key: K,
    value: GeneralMemoirFormData[K],
  ) => void;
}

export const useGeneralMemoirFormStore = create<GeneralMemoirFormState>(
  set => ({
    formData: {
      interviewInfo: {
        companyName: '',
        interviewDate: null,
        interviewTime: null,
        position: '',
        interviewStep: '',
        interviewerCount: '',
        interviewMethod: '',
        interviewMood: '',
      },
      questions: [
        { id: crypto.randomUUID(), type: '', content: '', answer: '' },
      ],
      interviewReview: {
        interviewLevel: '',
        satisfactionNote: '',
        freeNote: '',
        interviewStatus: '',
        visibility: 'private',
      },
      references: {
        url: '',
      },
    },
    updateFormData: (key, value) =>
      set(state => ({
        formData: {
          ...state.formData,
          [key]: value,
        },
      })),
  }),
);
