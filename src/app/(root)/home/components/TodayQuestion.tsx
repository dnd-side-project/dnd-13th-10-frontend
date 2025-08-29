'use client';

import Link from 'next/link';

import { formatDateToYYMMDD } from '@/utils/date';
import { PATH } from '@/constants/path';
import { useTodayQuestion } from '@/app/(fullscreen)/home/questions/today/hooks/useTodayQuestion';

export default function TodayQuestion() {
  const { todayQuestionData, isPending, isError } = useTodayQuestion();

  if (isPending) {
    return <TodayQuestionSkeleton />;
  }

  if (isError || !todayQuestionData) {
    return null;
  }

  const { memoir, question } = todayQuestionData;

  return (
    <Link href={PATH.QUESTIONS.TODAY.path}>
      <section className="bg-foundation-box rounded-xl p-5">
        <h3 className="typo-subhead-02 text-foundation-primary mb-2">
          오늘의 질문
        </h3>
        <div className="typo-subhead-03 mb-2 flex items-center gap-1">
          <span className="text-secondary-btn">Q.</span>
          <span className="text-foundation-primary line-clamp-1">
            {question.title}
          </span>
        </div>
        <div className="typo-body-long-01 text-foundation-secondary flex items-center gap-2">
          <span>{formatDateToYYMMDD(memoir.interviewDatetime)}</span>
          <span>|</span>
          <span>{memoir.companyName}</span>
        </div>
      </section>
    </Link>
  );
}

function TodayQuestionSkeleton() {
  return (
    <section className="bg-foundation-box animate-pulse rounded-xl p-5">
      <div className="bg-foundation-bg mb-2.5 h-5 w-1/4 rounded-md" />
      <div className="bg-foundation-bg mb-2 h-5 w-3/4 rounded-md" />
      <div className="bg-foundation-bg h-4 w-1/2 rounded-md" />
    </section>
  );
}
