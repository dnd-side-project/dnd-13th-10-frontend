import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';
import type {
  InterviewFormat,
  InterviewLevel,
  InterviewMethod,
  InterviewMood,
  InterviewStatus,
  InterviewStep,
  Position,
  SatisfactionNote,
  Questions,
} from '@/types/memoirTypes';

const initialFormData: GeneralMemoirFormData = {
  interviewInfo: {
    companyName: '',
    interviewDate: null,
    interviewTime: null,
    position: '' as Position,
    interviewStep: '' as InterviewStep,
    interviewFormat: '' as InterviewFormat,
    interviewMethod: '' as InterviewMethod,
    interviewMood: '' as InterviewMood,
  },
  questions: [
    {
      order: 1,
      questionType: '',
      title: '',
      answer: '',
    },
  ],
  interviewReview: {
    interviewLevel: '' as InterviewLevel,
    satisfactionNote: '' as SatisfactionNote,
    freeNote: '',
    interviewStatus: '' as InterviewStatus,
    isPublic: false,
  },
  references: {
    url: '',
  },
};

interface InterviewInfoData {
  companyName: string;
  interviewDate: Date | null;
  interviewTime: TimeValue | null;
  position: Position;
  interviewStep: InterviewStep;
  interviewFormat: InterviewFormat;
  interviewMethod: InterviewMethod;
  interviewMood: InterviewMood;
}

interface InterviewReviewData {
  interviewLevel: InterviewLevel;
  satisfactionNote: SatisfactionNote;
  freeNote: string;
  interviewStatus: InterviewStatus;
  isPublic: boolean;
}

interface ReferenceData {
  url: string;
}

export interface GeneralMemoirFormData {
  interviewInfo: InterviewInfoData;
  questions: Questions[];
  interviewReview: InterviewReviewData;
  references: ReferenceData;
}

interface GeneralMemoirFormState {
  formData: GeneralMemoirFormData;
  updateFormData: <K extends keyof GeneralMemoirFormData>(
    key: K,
    value: GeneralMemoirFormData[K],
  ) => void;
  resetForm: () => void;
}

export const useGeneralMemoirFormStore = create<GeneralMemoirFormState>(
  set => ({
    formData: initialFormData,
    updateFormData: (key, value) =>
      set(state => ({
        formData: {
          ...state.formData,
          [key]: value,
        },
      })),
    resetForm: () => set({ formData: initialFormData }),
  }),
);
