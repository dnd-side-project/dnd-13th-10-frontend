'use client';

import { useEffect } from 'react';

import type { MemoirData } from '@/types/memoirTypes';

import { useGeneralMemoirFormStore } from '@/app/(fullscreen)/home/memoir/general/store/generalMemoirFormStore';
import { useMemoirFormStore as useQuickMemoirFormStore } from '@/app/(fullscreen)/home/memoir/quick/store/memoirFormStore';

import QuickMemoirView from '../../../quick/components/QuickMemoirView';
import GeneralMemoirView from '../../../general/components/GeneralMemoirView';

interface Props {
  initialData: MemoirData;
}

export default function MemoirEditClient({ initialData }: Props) {
  const initializeQuickForm = useQuickMemoirFormStore(
    state => state.initializeForm,
  );
  const initializeGeneralForm = useGeneralMemoirFormStore(
    state => state.initializeForm,
  );

  useEffect(() => {
    if (initialData.type === '퀵 회고') {
      initializeQuickForm(initialData);
    } else {
      initializeGeneralForm(initialData);
    }
  }, [initialData, initializeQuickForm, initializeGeneralForm]);

  if (initialData.type === '퀵 회고') {
    return <QuickMemoirView mode="edit" memoirId={initialData.id} />;
  }

  if (initialData.type === '일반 회고') {
    return <GeneralMemoirView mode="edit" memoirId={initialData.id} />;
  }

  return <div>유효하지 않은 회고 타입입니다.</div>;
}
