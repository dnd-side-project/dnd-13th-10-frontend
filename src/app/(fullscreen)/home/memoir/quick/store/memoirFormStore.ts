import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';

export interface QuestionItem {
  id: string;
  type: string;
  content: string;
}

interface Step1Data {
  companyName: string;
  position: string;
  interviewDate: Date | null;
  interviewTime: TimeValue | null;
  interviewerCount: string;
}

interface Step2Data {
  interviewMood: string;
  satisfaction: string;
}

interface Step4Data {
  notes: string;
  result: string;
  visibility: 'private' | 'public';
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
    step1: {
      companyName: '',
      position: '',
      interviewDate: null,
      interviewTime: null,
      interviewerCount: '',
    },
    step2: {
      interviewMood: '',
      satisfaction: '',
    },
    step3: [{ id: crypto.randomUUID(), type: '', content: '' }],
    step4: {
      notes: '',
      result: '',
      visibility: 'private',
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
