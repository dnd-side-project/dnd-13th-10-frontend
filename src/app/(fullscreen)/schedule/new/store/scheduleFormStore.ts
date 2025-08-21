import { create } from 'zustand';

import type { ScheduleCreate } from '@/types/scheduleTypes';

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
}

export const useScheduleFormStore = create<ScheduleFormState>(set => ({
  formData: initialState,
  updateFormData: (key, value) =>
    set(state => ({ formData: { ...state.formData, [key]: value } })),
}));
