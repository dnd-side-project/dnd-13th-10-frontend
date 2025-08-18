import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';
import type {
  MemoirType,
  InterviewFormat,
  InterviewMood,
  InterviewStatus,
  Position,
  QuestionType,
  SatisfactionNote,
} from '@/types/memoirTypes';

export interface QuestionItem {
  order: string;
  questionType: QuestionType | '';
  content: string;
}

interface Step1Data {
  companyName: string;
  position: Position;
  interviewDate: Date | null;
  interviewTime: TimeValue | null;
  interviewFormat: InterviewFormat;
}

interface Step2Data {
  interviewMood: InterviewMood;
  satisfactionNote: SatisfactionNote;
}

interface Step4Data {
  freeNote: string;
  interviewStatus: InterviewStatus;
  isPublic: boolean;
}

export interface MemoirFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: QuestionItem[];
  step4: Step4Data;
}

interface MemoirFormState {
  formData: MemoirFormData;
  updateStepData: <K extends keyof MemoirFormData>(
    stepKey: K,
    data: MemoirFormData[K],
  ) => void;
}

export const useMemoirFormStore = create<MemoirFormState>(set => ({
  formData: {
    type: '' as MemoirType | '',
    step1: {
      companyName: '',
      position: '' as Position,
      interviewDate: null,
      interviewTime: null,
      interviewFormat: '' as InterviewFormat,
    },
    step2: {
      interviewMood: '' as InterviewMood,
      satisfactionNote: '' as SatisfactionNote,
    },
    step3: [
      {
        order: crypto.randomUUID(),
        questionType: '' as QuestionType,
        content: '',
      },
    ],
    step4: {
      freeNote: '',
      interviewStatus: '' as InterviewStatus,
      isPublic: false,
    },
  },
  updateStepData: (stepKey, data) =>
    set(state => ({
      formData: {
        ...state.formData,
        [stepKey]: data,
      },
    })),
}));
