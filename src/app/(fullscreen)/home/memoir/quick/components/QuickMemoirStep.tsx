'use client';

import { JSX } from 'react';

import Step1Component from './Step1Component';
import Step2Component from './Step2Component';
import Step3Component from './Step3Component';
import Step4Component from './Step4Component';

const TOTAL_STEPS = 4;
const STEP_TITLES = [
  ['면접 회고를 빠르게 작성해봐요!'],
  ['이번 면접의 분위기나', '만족도는 어떠셨나요?'],
  ['면접 질문을 등록해 주세요.'],
  ['이번 면접 경험을', '자유롭게 기록해 주세요.'],
];
const STEP_COMPONENTS: { [key: number]: JSX.Element } = {
  1: <Step1Component />,
  2: <Step2Component />,
  3: <Step3Component />,
  4: <Step4Component />,
};

export default function QuickMemoirStep({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="px-5">
      <div className="mb-8">
        <span className="typo-display-01 text-primary-btn pt-6">
          {currentStep}
        </span>
        <span className="typo-display-01 text-foundation-primary pt-6">
          /{TOTAL_STEPS}
        </span>
        <p className="text-foundation-strong typo-display-01 mt-2">
          {STEP_TITLES[currentStep - 1].map((line, index) => (
            <span key={index}>
              {line}
              {index < STEP_TITLES[currentStep - 1].length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <div className="pb-6">{STEP_COMPONENTS[currentStep] || null}</div>
    </div>
  );
}
