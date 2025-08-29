import { create } from 'zustand';

import type { TimeValue } from '@/components/ui/picker/TimePicker';
import type {
  InterviewFormat,
  InterviewMood,
  InterviewStatus,
  Position,
  SatisfactionNote,
  Questions,
  MemoirData,
  QuestionType,
} from '@/types/memoirTypes';
import { convertISOToTimeValue } from '@/utils/date';
import {
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_MOOD_LABELS,
  INTERVIEW_STATUS_LABELS,
  POSITION_LABELS,
  QUESTION_TYPE_LABELS,
  SATISFACTION_NOTE_LABELS,
} from '@/constants/labels';

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
  initializeForm: (data: MemoirData) => void;
}

const findCodeByLabel = (
  labelsObject: Record<string, string>,
  label: string,
): string => {
  if (!label) return '';
  const entry = Object.entries(labelsObject).find(
    ([_code, lbl]) => lbl === label,
  );
  return entry ? entry[0] : '';
};

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
  initializeForm: data => {
    set({
      formData: {
        step1: {
          companyName: data.companyName,
          position: findCodeByLabel(POSITION_LABELS, data.position) as Position,
          interviewDate: new Date(data.interviewDatetime),
          interviewTime: convertISOToTimeValue(data.interviewDatetime) ?? null,
          interviewFormat: findCodeByLabel(
            INTERVIEW_FORMAT_LABELS,
            data.interviewFormat,
          ) as InterviewFormat,
        },
        step2: {
          interviewMood: findCodeByLabel(
            INTERVIEW_MOOD_LABELS,
            data.interviewMood,
          ) as InterviewMood,
          satisfactionNote: findCodeByLabel(
            SATISFACTION_NOTE_LABELS,
            data.satisfactionNote || '',
          ) as SatisfactionNote,
        },
        step3: data.questions.map(q => ({
          order: q.id,
          questionType: findCodeByLabel(
            QUESTION_TYPE_LABELS,
            q.questionType,
          ) as QuestionType,
          title: q.title,
        })),
        step4: {
          freeNote: data.freeNote || '',
          interviewStatus: findCodeByLabel(
            INTERVIEW_STATUS_LABELS,
            data.interviewStatus,
          ) as InterviewStatus,
          isPublic: data.isPublic,
        },
      },
    });
  },
}));
