'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { formatDateToYYYYMMDD, formatTime24 } from '@/utils/date';
import { memoirMutations } from '@/queries/memoirOptions';
import { MemoirsRequest } from '@/types/memoirTypes';
import { MEMOIR_TYPES } from '@/constants/code';
import { PATH } from '@/constants/path';

import QuickMemoirStep from './QuickMemoirStep';
import { useMemoirFormStore } from '../store/memoirFormStore';
import { isStepValid } from '../utils/memoirValidation';

const TOTAL_STEPS = 4;

export default function QuickMemoirView() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();
  const formData = useMemoirFormStore(state => state.formData);
  const resetForm = useMemoirFormStore(state => state.resetForm);

  const { mutate: createMemoir } = useMutation(
    memoirMutations.create(queryClient),
  );

  const isLastStep = currentStep === TOTAL_STEPS;
  const isFirstStep = currentStep === 1;
  const progressWidth = (currentStep / TOTAL_STEPS) * 100;

  const isNextButtonEnabled = isStepValid(currentStep, formData);

  const handleSubmit = () => {
    const payload: MemoirsRequest = {
      type: MEMOIR_TYPES.QUICK,
      companyName: formData.step1.companyName,
      position: formData.step1.position,
      interviewDate: formData.step1.interviewDate
        ? formatDateToYYYYMMDD(formData.step1.interviewDate)
        : '',
      interviewTime: formatTime24(formData.step1.interviewTime),
      interviewFormat: formData.step1.interviewFormat,
      interviewMood: formData.step2.interviewMood,
      satisfactionNote: formData.step2.satisfactionNote,
      interviewStatus: formData.step4.interviewStatus,
      freeNote: formData.step4.freeNote,
      questions: formData.step3.map((q, index) => ({
        questionType: q.questionType,
        title: q.title,
        order: index + 1,
      })),
      isTmp: false,
      isPublic: formData.step4.isPublic,
    };

    createMemoir(payload, {
      onSuccess: response => {
        const newMemoirId = response.data;

        if (newMemoirId) {
          alert('회고가 성공적으로 저장되었습니다!');

          resetForm();

          const detailPath = PATH.MEMOIR.DETAIL.path.replace(
            '[id]',
            String(newMemoirId),
          );

          router.push(detailPath);
        } else {
          alert('회고가 저장되었지만, 홈으로 이동합니다.');
          router.push(PATH.HOME.path);
        }
      },
      onError: _error => {
        alert('회고 저장에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header title="퀵회고" />
      <div className="h-[7px] overflow-hidden">
        <div
          className={cn(
            'bg-primary-btn h-full transition-all duration-200 ease-out',
            !isLastStep && 'rounded-r-full',
          )}
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <main className="no-scrollbar flex-1 overflow-y-auto pt-6">
        <QuickMemoirStep currentStep={currentStep} />
      </main>

      <footer className="px-5 pt-4 pb-6">
        <div className="flex gap-2">
          {!isFirstStep && (
            <Button
              variant="secondary"
              size="large"
              onClick={handlePrevious}
              className="flex-1"
            >
              이전
            </Button>
          )}
          <Button
            size="large"
            onClick={handleNext}
            className="flex-1"
            disabled={!isNextButtonEnabled}
          >
            {isLastStep ? '저장' : '다음'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
