'use client';

import { useState } from 'react';

import PlusIcon from '@/assets/icon/plus_icon.svg';
import ClosedIcon from '@/assets/icon/closed_icon.svg';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { SelectPicker } from '@/components/ui/picker/SelectPicker';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
  BottomDrawerItem,
  type DrawerItem,
} from '@/components/ui/Drawer';

import Title from './Title';
import {
  QuestionItem,
  useGeneralMemoirFormStore,
} from '../store/generalMemoirFormStore';

const QUESTION_TYPE_OPTIONS: DrawerItem[] = [
  { id: 'personality', label: '인성질문' },
  { id: 'job', label: '직무질문' },
  { id: 'experience', label: '경험질문' },
  { id: 'company', label: '회사질문' },
  { id: 'follow-up', label: '꼬리질문' },
];

export default function QnA() {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState<number | null>(
    null,
  );
  const [tempSelectedType, setTempSelectedType] = useState<string>('');

  const questions = useGeneralMemoirFormStore(
    state => state.formData.questions,
  );
  const updateFormData = useGeneralMemoirFormStore(
    state => state.updateFormData,
  );

  const handleQuestionChange = (
    index: number,
    field: 'type' | 'content' | 'answer',
    value: string,
  ) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    updateFormData('questions', newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: QuestionItem = {
      id: crypto.randomUUID(),
      type: '',
      content: '',
      answer: '',
    };
    updateFormData('questions', [...questions, newQuestion]);
  };

  const handleOpenDrawer = (index: number) => {
    setTempSelectedType(questions[index].type);
    setActiveDrawerIndex(index);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length <= 1) return;
    const filteredQuestions = questions.filter(q => q.id !== id);
    updateFormData('questions', filteredQuestions);
  };

  const handleSave = () => {
    if (activeDrawerIndex !== null) {
      handleQuestionChange(activeDrawerIndex, 'type', tempSelectedType);
    }
    setActiveDrawerIndex(null);
  };

  return (
    <section>
      <Title title="질문과 답변" />
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label label={`질문 ${index + 1}`} />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="cursor-pointer"
                >
                  <ClosedIcon className="text-foundation-primary h-5 w-5" />
                </button>
              )}
            </div>

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
              <Input
                placeholder="답변을 입력하세요."
                value={question.answer}
                onChange={e =>
                  handleQuestionChange(index, 'answer', e.target.value)
                }
              />
            </div>
          </div>
        ))}

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
          <Button
            size="large"
            onClick={handleSave}
            disabled={!tempSelectedType}
          >
            저장
          </Button>
        </BottomDrawerFooter>
      </BottomDrawer>
    </section>
  );
}
