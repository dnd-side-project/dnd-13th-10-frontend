'use client';

import { useState } from 'react';

import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import {
  BottomDrawer,
  BottomDrawerContent,
  BottomDrawerFooter,
  BottomDrawerHandle,
  BottomDrawerHeader,
} from '@/components/ui/Drawer';
import { cn } from '@/utils/cn';
import type { Question } from '@/types/memoirTypes';

type FilterType = 'quick' | 'general';

export default function QuestionList({ questions }: { questions: Question[] }) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('quick');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredQuestions = questions.filter(question => {
    if (selectedFilter === 'quick') {
      return !question.answer;
    }
    return !!question.answer;
  });

  const handleQuestionClick = (question: Question) => {
    if (question.answer) {
      setSelectedQuestion(question);
      setIsDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="pb-8">
      <header className="flex gap-2 py-8">
        <Chip
          text="퀵회고"
          isSelected={selectedFilter === 'quick'}
          onClick={() => setSelectedFilter('quick')}
        />
        <Chip
          text="일반회고"
          isSelected={selectedFilter === 'general'}
          onClick={() => setSelectedFilter('general')}
        />
      </header>
      <div className="space-y-4">
        {filteredQuestions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onClick={() => handleQuestionClick(question)}
          />
        ))}
      </div>

      {selectedQuestion && (
        <BottomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <BottomDrawerHandle />
          <BottomDrawerHeader title="회고 답변 상세" onClose={closeDrawer} />
          <BottomDrawerContent className="px-4">
            <div className="bg-foundation-box space-y-3 rounded-xl p-4">
              <h3 className="typo-subhead-03">
                <span className="text-secondary-btn">Q. </span>
                <span className="text-foundation-primary">
                  {selectedQuestion.content}
                </span>
              </h3>
              <p className="text-foundation-secondary typo-body-long-01 break-keep">
                {selectedQuestion.answer}
              </p>
            </div>
          </BottomDrawerContent>
          <BottomDrawerFooter>
            <Button size="large" onClick={closeDrawer}>
              닫기
            </Button>
          </BottomDrawerFooter>
        </BottomDrawer>
      )}
    </div>
  );
}

function QuestionItem({
  question,
  onClick,
}: {
  question: Question;
  onClick: () => void;
}) {
  const isClickable = !!question.answer;

  return (
    <button
      type="button"
      disabled={!isClickable}
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'bg-foundation-box rounded-xl px-5 py-3 text-left',
        isClickable && 'cursor-pointer',
      )}
    >
      <h3 className={cn('typo-subhead-03', question.answer && 'mb-2')}>
        <span className="text-secondary-btn">Q. </span>
        <span className="text-foundation-primary">{question.content}</span>
      </h3>
      {question.answer && (
        <p className="text-foundation-secondary typo-body-long-01 line-clamp-2 break-keep text-ellipsis">
          {question.answer}
        </p>
      )}
    </button>
  );
}
