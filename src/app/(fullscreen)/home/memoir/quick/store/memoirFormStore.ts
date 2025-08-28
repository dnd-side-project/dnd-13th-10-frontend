import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';
import type {
  InterviewFormat,
  InterviewMood,
  InterviewStatus,
  Position,
  SatisfactionNote,
  Questions,
} from '@/types/memoirTypes';

const initialFormData: MemoirFormData = {
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
      order: 1,
      questionType: '',
      title: '',
    },
  ],
  step4: {
    freeNote: '',
    interviewStatus: '' as InterviewStatus,
    isPublic: false,
  },
};

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
  step3: Questions[];
  step4: Step4Data;
}

interface MemoirFormState {
  formData: MemoirFormData;
  updateStepData: <K extends keyof MemoirFormData>(
    stepKey: K,
    data: MemoirFormData[K],
  ) => void;
  resetForm: () => void;
}

export const useMemoirFormStore = create<MemoirFormState>(set => ({
  formData: initialFormData,
  updateStepData: (stepKey, data) =>
    set(state => ({
      formData: {
        ...state.formData,
        [stepKey]: data,
      },
    })),
  resetForm: () => set({ formData: initialFormData }),
}));
