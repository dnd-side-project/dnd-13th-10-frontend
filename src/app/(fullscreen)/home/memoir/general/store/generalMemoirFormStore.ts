import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';
import type {
  MemoirType,
  InterviewFormat,
  InterviewLevel,
  InterviewMethod,
  InterviewMood,
  InterviewStatus,
  InterviewStep,
  Position,
  QuestionType,
  SatisfactionNote,
} from '@/types/memoirTypes';

export interface QuestionItem {
  order: string;
  questionType: QuestionType | '';
  content: string;
  answer: string;
}

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
      type: '' as MemoirType,
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
          order: crypto.randomUUID(),
          questionType: '',
          content: '',
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
