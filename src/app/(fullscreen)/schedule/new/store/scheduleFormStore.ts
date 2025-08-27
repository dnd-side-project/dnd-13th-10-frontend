import { create } from 'zustand';

import { INTERVIEW_STEP_LABELS, POSITION_LABELS } from '@/constants/labels';
import type { ScheduleCreate, ScheduleDetailData } from '@/types/scheduleTypes';

const initialState: ScheduleCreate = {
  companyName: '',
  position: '',
  interviewDateTime: '',
  location: '',
  interviewStep: '',
};

interface ScheduleFormState {
  formData: ScheduleCreate;
  updateFormData: <K extends keyof ScheduleCreate>(
    key: K,
    value: ScheduleCreate[K],
  ) => void;
  initializeFormData: (data: ScheduleDetailData) => void;
  resetFormData: () => void;
}

const findCodeByLabel = (
  labelsObject: Record<string, string>,
  label: string,
): string => {
  const entry = Object.entries(labelsObject).find(
    ([_code, lbl]) => lbl === label,
  );
  return entry ? entry[0] : '';
};

export const useScheduleFormStore = create<ScheduleFormState>(set => ({
  formData: initialState,
  updateFormData: (key, value) =>
    set(state => ({ formData: { ...state.formData, [key]: value } })),
  initializeFormData: data => {
    const positionCode = findCodeByLabel(POSITION_LABELS, data.position);
    const interviewStepCode = findCodeByLabel(
      INTERVIEW_STEP_LABELS,
      data.interviewStep,
    );

    set({
      formData: {
        companyName: data.companyName,
        position: positionCode,
        interviewDateTime: data.interviewDateTime,
        location: data.location,
        interviewStep: interviewStepCode,
      },
    });
  },
  resetFormData: () => set({ formData: initialState }),
}));
