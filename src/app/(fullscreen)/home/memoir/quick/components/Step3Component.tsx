'use client';

import { useState } from 'react';

import PlusIcon from '@/assets/icon/plus_icon.svg';
import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import { Label } from '@/components/ui/Label';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { QUESTION_TYPE } from '@/constants/code';
import { QUESTION_TYPE_LABELS } from '@/constants/labels';
import { createOptionsArray } from '@/utils/options';
import type { QuestionType } from '@/types/memoirTypes';

import {
  type QuestionItem,
  useMemoirFormStore,
} from '../store/memoirFormStore';

const QUESTION_TYPE_OPTIONS = createOptionsArray(
  QUESTION_TYPE,
  QUESTION_TYPE_LABELS,
);

export default function Step3Component() {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState<number | null>(
    null,
  );
  const [tempSelectedType, setTempSelectedType] = useState<QuestionType | ''>(
    '',
  );

  const questions = useMemoirFormStore(state => state.formData.step3);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleQuestionChange = (
    index: number,
    field: 'questionType' | 'content',
    value: string,
  ) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    updateStepData('step3', newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: QuestionItem = {
      order: crypto.randomUUID(),
      questionType: '',
      content: '',
    };
    updateStepData('step3', [...questions, newQuestion]);
  };

  const handleOpenDrawer = (index: number) => {
    setTempSelectedType(questions[index].questionType);
    setActiveDrawerIndex(index);
  };

  const handleRemoveQuestion = (order: string) => {
    if (questions.length <= 1) return;
    const filteredQuestions = questions.filter(q => q.order !== order);
    updateStepData('step3', filteredQuestions);
  };

  const handleSave = () => {
    if (activeDrawerIndex !== null) {
      handleQuestionChange(activeDrawerIndex, 'questionType', tempSelectedType);
    }
    setActiveDrawerIndex(null);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {questions.map((question, index) => (
          <div key={question.order} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label label={`질문 ${index + 1}`} />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.order)}
                  className="mt-2.5"
                >
                  <span className="text-primary-btn typo-subhead-02">삭제</span>
                </button>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <SelectPicker
                placeholder="질문 선택"
                value={
                  question.questionType &&
                  question.questionType in QUESTION_TYPE_LABELS
                    ? QUESTION_TYPE_LABELS[
                        question.questionType as keyof typeof QUESTION_TYPE_LABELS
                      ]
                    : ''
                }
                onClick={() => handleOpenDrawer(index)}
              />
              <Input
                placeholder="질문을 입력하세요."
                value={question.content}
                onChange={e =>
                  handleQuestionChange(index, 'content', e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleAddQuestion}
          aria-label="질문 추가"
          className="bg-foundation-box border-foundation-divider flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed px-4 py-3"
        >
          <div className="flex items-center">
            <PlusIcon />
            <span className="typo-body-02 text-foundation-primary">
              질문 추가
            </span>
          </div>
        </button>
      </div>

      <BottomDrawer
        isOpen={activeDrawerIndex !== null}
        onOpenChange={open => !open && setActiveDrawerIndex(null)}
      >
        <BottomDrawerHandle />
        <BottomDrawerHeader
          title="면접 질문"
          onClose={() => setActiveDrawerIndex(null)}
        />
        <BottomDrawerContent>
          {QUESTION_TYPE_OPTIONS.map(option => (
            <BottomDrawerItem
              key={option.id}
              item={{
                ...option,
                checked: tempSelectedType === option.id,
              }}
              onClick={() => setTempSelectedType(option.id as QuestionType)}
            />
          ))}
        </BottomDrawerContent>
        <BottomDrawerFooter>
          <Button
            size="large"
            onClick={handleSave}
            disabled={!tempSelectedType}
          >
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
