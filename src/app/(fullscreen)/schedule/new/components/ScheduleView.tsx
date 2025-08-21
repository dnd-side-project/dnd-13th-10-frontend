'use client';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';

import ScheduleForm from './ScheduleForm';
import { useScheduleFormStore } from '../store/scheduleFormStore';
import { isScheduleFormValid } from '../utils/scheduleValidation';

export default function ScheduleView() {
  const formData = useScheduleFormStore(state => state.formData);
  const isFormValid = isScheduleFormValid(formData);

  const handleSave = () => {
    if (!isFormValid) {
      return;
    }
    console.log('등록한 일정 데이터:', formData);
    // TO-DO: 여기에 API 호출 등 실제 저장 로직을 구현
  };

  return (
    <div className="flex h-screen flex-col">
      <Header title="일정" />

      <main className="no-scrollbar flex-1 overflow-y-auto px-5 pt-6">
        <ScheduleForm />
      </main>

      <footer className="px-5 pt-4 pb-6">
        <Button size="large" onClick={handleSave} disabled={!isFormValid}>
          저장
        </Button>
      </footer>
    </div>
  );
}
