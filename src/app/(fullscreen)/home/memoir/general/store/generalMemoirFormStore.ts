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
  MemoirData,
} from '@/types/memoirTypes';
import { convertISOToTimeValue } from '@/utils/date';
import {
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_LEVEL_LABELS,
  INTERVIEW_METHOD_LABELS,
  INTERVIEW_MOOD_LABELS,
  INTERVIEW_STATUS_LABELS,
  INTERVIEW_STEP_LABELS,
  POSITION_LABELS,
  QUESTION_TYPE_LABELS,
  SATISFACTION_NOTE_LABELS,
} from '@/constants/labels';

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
  initializeForm: (data: MemoirData) => void;
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
    initializeForm: data => {
      set({
        formData: {
          interviewInfo: {
            companyName: data.companyName,
            interviewDate: new Date(data.interviewDatetime),
            interviewTime:
              convertISOToTimeValue(data.interviewDatetime) ?? null,
            position: findCodeByLabel(
              POSITION_LABELS,
              data.position,
            ) as Position,
            interviewStep: findCodeByLabel(
              INTERVIEW_STEP_LABELS,
              data.interviewStep || '',
            ) as InterviewStep,
            interviewFormat: findCodeByLabel(
              INTERVIEW_FORMAT_LABELS,
              data.interviewFormat || '',
            ) as InterviewFormat,
            interviewMethod: findCodeByLabel(
              INTERVIEW_METHOD_LABELS,
              data.interviewMethod || '',
            ) as InterviewMethod,
            interviewMood: findCodeByLabel(
              INTERVIEW_MOOD_LABELS,
              data.interviewMood || '',
            ) as InterviewMood,
          },
          questions: data.questions.map(q => ({
            order: q.id,
            questionType: findCodeByLabel(QUESTION_TYPE_LABELS, q.questionType),
            title: q.title,
            answer: q.answer || '',
          })),
          interviewReview: {
            interviewLevel: findCodeByLabel(
              INTERVIEW_LEVEL_LABELS,
              data.interviewLevel || '',
            ) as InterviewLevel,
            satisfactionNote: findCodeByLabel(
              SATISFACTION_NOTE_LABELS,
              data.satisfactionNote || '',
            ) as SatisfactionNote,
            freeNote: data.freeNote || '',
            interviewStatus: findCodeByLabel(
              INTERVIEW_STATUS_LABELS,
              data.interviewStatus || '',
            ) as InterviewStatus,
            isPublic: data.isPublic,
          },
          references: {
            url: data.url || '',
          },
        },
      });
    },
  }),
);
