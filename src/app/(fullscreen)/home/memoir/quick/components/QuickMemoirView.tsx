'use client';

import { useState } from 'react';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

import QuickMemoirStep from './QuickMemoirStep';
import { useMemoirFormStore } from '../store/memoirFormStore';
import { isStepValid } from '../utils/memoirValidation';

const TOTAL_STEPS = 4;

export default function QuickMemoirView() {
  const [currentStep, setCurrentStep] = useState(1);

  const formData = useMemoirFormStore(state => state.formData);

  const isLastStep = currentStep === TOTAL_STEPS;
  const isFirstStep = currentStep === 1;
  const progressWidth = (currentStep / TOTAL_STEPS) * 100;

  const isNextButtonEnabled = isStepValid(currentStep, formData);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('최종 회고 데이터:', formData);
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
