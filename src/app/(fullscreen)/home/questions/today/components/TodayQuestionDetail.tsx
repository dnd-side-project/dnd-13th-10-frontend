'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Empty';
import { PATH } from '@/constants/path';
import { formatDateToYYMMDD } from '@/utils/date';
import RightIcon from '@/assets/icon/right_arrow_icon.svg';

import { useTodayQuestion } from '../hooks/useTodayQuestion';

export default function TodayQuestionDetail() {
  const { todayQuestionData, isPending, isError } = useTodayQuestion();

  if (isPending) {
    return <TodayQuestionSkeleton />;
  }

  if (isError || !todayQuestionData) {
    return (
      <div className="pt-10">
        <EmptyState text="표시할 질문이 없습니다. 회고를 먼저 작성해주세요." />
      </div>
    );
  }

  const { memoir, question } = todayQuestionData;

  return (
    <div className="flex flex-col gap-8 p-5">
      <section>
        <Badge
          shape="minimal"
          size="xsmall"
          className="text-foundation-primary"
        >
          {question.questionType}
        </Badge>
        <div className="mt-4 flex flex-col gap-4">
          <p className="typo-subhead-03">
            <span className="text-secondary-btn">Q. </span>
            <span className="text-foundation-strong">{question.title}</span>
          </p>
          <p className="typo-body-long-01 text-foundation-secondary whitespace-pre-wrap">
            A. {question.answer}
          </p>
        </div>
      </section>

      <section>
        <p className="typo-subhead-03 text-foundation-primary mb-2">
          회고 정보
        </p>
        <Link href={PATH.MEMOIR.DETAIL.path.replace('[id]', String(memoir.id))}>
          <div className="bg-foundation-box flex cursor-pointer items-center justify-between rounded-xl px-5 py-3">
            <div>
              <p className="typo-subhead-long-03 text-foundation-primary">
                {memoir.companyName}
              </p>
              <span className="typo-body-01 text-foundation-secondary">
                회고일자 {formatDateToYYMMDD(memoir.interviewDatetime)}
              </span>
            </div>
            <RightIcon className="text-foundation-secondary" />
          </div>
        </Link>
      </section>
    </div>
  );
}

function TodayQuestionSkeleton() {
  return (
    <div className="animate-pulse p-5">
      <div className="bg-foundation-box mb-4 h-6 w-24 rounded-md" />
      <div className="mb-8 space-y-2">
        <div className="bg-foundation-box h-6 w-full rounded-md" />
        <div className="bg-foundation-box h-20 w-full rounded-md" />
      </div>
      <div className="bg-foundation-box h-20 w-full rounded-xl" />
    </div>
  );
}
