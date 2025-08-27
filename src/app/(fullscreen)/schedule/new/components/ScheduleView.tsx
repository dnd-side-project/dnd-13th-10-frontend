'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { scheduleMutations } from '@/queries/scheduleOptions';
import { PATH } from '@/constants/path';
import type { ScheduleDetailData } from '@/types/scheduleTypes';

import ScheduleForm from './ScheduleForm';
import { useScheduleFormStore } from '../store/scheduleFormStore';
import { isScheduleFormValid } from '../utils/scheduleValidation';

interface Props {
  mode: 'create' | 'edit';
  scheduleId?: number;
  initialData?: ScheduleDetailData;
}

export default function ScheduleView({ mode, scheduleId, initialData }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { formData, initializeFormData, resetFormData } =
    useScheduleFormStore();
  const isFormValid = isScheduleFormValid(formData);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      initializeFormData(initialData);
    }

    return () => {
      resetFormData();
    };
  }, [mode, initialData, initializeFormData, resetFormData]);

  const { mutate: createSchedule, isPending: isCreatePending } = useMutation(
    scheduleMutations.create(queryClient),
  );
  const { mutate: updateSchedule, isPending: isUpdatePending } = useMutation(
    scheduleMutations.update(queryClient),
  );

  const isPending = isCreatePending || isUpdatePending;
  const handleSave = () => {
    if (!isFormValid) return;

    if (mode === 'create') {
      createSchedule(formData, {
        onSuccess: () => {
          alert('일정이 등록되었습니다.');
          router.push(PATH.SCHEDULE.HOME.path);
        },
        onError: () => alert('등록에 실패했습니다.'),
      });
    } else if (mode === 'edit' && scheduleId) {
      updateSchedule(
        { scheduleId, data: formData },
        {
          onSuccess: () => {
            alert('일정이 수정되었습니다.');
            router.push(PATH.SCHEDULE.HOME.path);
          },
          onError: () => alert('수정에 실패했습니다.'),
        },
      );
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header title="일정" />

      <main className="no-scrollbar flex-1 overflow-y-auto px-5 pt-6">
        <ScheduleForm />
      </main>

      <footer className="px-5 pt-4 pb-6">
        <Button size="large" onClick={handleSave} disabled={!isFormValid}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </footer>
    </div>
  );
}
