'use client';

import { useState } from 'react';

import PlusIcon from '@/assets/icon/plus_icon.svg';
import ClosedIcon from '@/assets/icon/closed_icon.svg';
import { Input } from '@/components/ui/Input';
import { SelectPicker } from '@/components/ui/SelectPicker';
import { Label } from '@/components/ui/Label';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
  type DrawerItem,
} from '@/components/ui/Drawer';

import {
  type QuestionItem,
  useMemoirFormStore,
} from '../store/memoirFormStore';
import { Button } from '@/components/ui/Button';

const QUESTION_TYPE_OPTIONS: DrawerItem[] = [
  { id: 'personality', label: '인성질문' },
  { id: 'job', label: '직무질문' },
  { id: 'experience', label: '경험질문' },
  { id: 'company', label: '회사질문' },
  { id: 'follow-up', label: '꼬리질문' },
];

export default function Step3Component() {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState<number | null>(
    null,
  );
  const [tempSelectedType, setTempSelectedType] = useState<string>('');

  const questions = useMemoirFormStore(state => state.formData.step3);
  const updateStepData = useMemoirFormStore(state => state.updateStepData);

  const handleQuestionChange = (
    index: number,
    field: 'type' | 'content',
    value: string,
  ) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    updateStepData('step3', newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: QuestionItem = {
      id: crypto.randomUUID(),
      type: '',
      content: '',
    };
    updateStepData('step3', [...questions, newQuestion]);
  };

  const handleOpenDrawer = (index: number) => {
    setTempSelectedType(questions[index].type);
    setActiveDrawerIndex(index);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length <= 1) return;
    const filteredQuestions = questions.filter(q => q.id !== id);
    updateStepData('step3', filteredQuestions);
  };

  const handleSave = () => {
    if (activeDrawerIndex !== null) {
      handleQuestionChange(activeDrawerIndex, 'type', tempSelectedType);
    }
    setActiveDrawerIndex(null);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label label="면접 질문" />
        {questions.map((question, index) => (
          <div key={question.id} className="flex items-start gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <SelectPicker
                placeholder="질문 선택"
                value={question.type}
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
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(question.id)}
                className="mt-2.5"
              >
                <ClosedIcon className="text-foundation-primary h-5 w-5" />
              </button>
            )}
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
                checked: tempSelectedType === option.label,
              }}
              onClick={() => {
                setTempSelectedType(option.label);
              }}
            />
          ))}
        </BottomDrawerContent>
        <BottomDrawerFooter>
          <Button size="large" onClick={handleSave}>
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </>
  );
}
