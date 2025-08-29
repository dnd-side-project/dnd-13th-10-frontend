'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import Logo from '@/assets/logo/logo_icon.svg';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { getInterviewStatusLabel } from '@/utils/labelUtils';
import { memoirQueries } from '@/queries/memoirOptions';
import type { HotMemoir, InterviewStatus } from '@/types/memoirTypes';
import { formatTimeAgo } from '@/utils/date';
import { PATH } from '@/constants/path';

export default function AllHotMemoirList() {
  const { data, isPending, isError } = useQuery(memoirQueries.hot());

  if (isPending) {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <AllHotMemoirItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        HOT 회고를 불러오는 데 실패했습니다.
      </div>
    );
  }

  const hotMemoirs = data?.data || [];

  if (hotMemoirs.length === 0) {
    return <div className="py-10 text-center">이번주 HOT 회고가 없습니다.</div>;
  }

  return (
    <div>
      {hotMemoirs.map((memoir, index) => (
        <AllHotMemoirItem
          key={memoir.id}
          memoir={memoir}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

function AllHotMemoirItem({
  memoir,
  isFirst,
}: {
  memoir: HotMemoir;
  isFirst: boolean;
}) {
  const interviewTypeClassName =
    memoir.type === '퀵 회고' ? 'text-secondary-btn' : 'text-primary-btn';
  const interviewStatusClassName =
    memoir.interviewStatus === '합격'
      ? 'text-primary-btn'
      : memoir.interviewStatus === '결과 대기중'
        ? 'text-foundation-secondary'
        : 'text-warning';

  const memoirDetailPath = PATH.MEMOIR.DETAIL.path.replace(
    '[id]',
    String(memoir.id),
  );

  return (
    <Link href={memoirDetailPath}>
      <div
        className={cn(
          'border-foundation-box border px-5 pb-4',
          isFirst ? 'pt-0' : 'pt-4',
        )}
      >
        <div className="mb-3 flex items-center">
          {memoir.interviewStatus && (
            <Badge
              size="xsmall"
              shape="minimal"
              className={cn('mr-2', interviewStatusClassName)}
            >
              {getInterviewStatusLabel(
                memoir.interviewStatus as InterviewStatus,
              )}
            </Badge>
          )}
          <Badge
            size="xsmall"
            shape="minimal"
            className={interviewTypeClassName}
          >
            {memoir.type}
          </Badge>
        </div>

        <div className="mt-3 mb-2 flex items-center gap-3">
          <figure className="h-10 w-10 shrink-0 rounded-full">
            {memoir.imageUrl ? (
              <Image
                src={memoir.imageUrl}
                alt={memoir.userName}
                width={40}
                height={40}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="bg-foundation-secondary/20 flex h-full w-full items-center justify-center rounded-full">
                <Logo height={20} width={20} />
              </div>
            )}
          </figure>

          <div className="mb-2 flex min-w-0 flex-col">
            <div className="typo-subhead-long-03 line-clamp-1 flex items-center gap-[6px] text-ellipsis">
              <span className="text-foundation-primary truncate">
                {memoir.companyName}
              </span>
              <span className="text-foundation-disabled">|</span>
              <span className="text-foundation-primary truncate">
                {memoir.position}
              </span>
            </div>
            <span className="text-foundation-secondary typo-caption">
              {memoir.userName}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="typo-caption flex min-w-0 items-start gap-1">
            <span className="text-foundation-primary">Q.</span>
            <span className="text-foundation-secondary truncate">
              {memoir.firstQuestion}
            </span>
          </div>

          <span className="typo-caption text-foundation-secondary ml-6 shrink-0">
            {formatTimeAgo(memoir.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function AllHotMemoirItemSkeleton() {
  return (
    <div className="border-foundation-box animate-pulse border px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="bg-foundation-bg h-5 w-12 rounded-md" />
        <div className="bg-foundation-bg h-5 w-14 rounded-md" />
      </div>
      <div className="mt-3 mb-2 flex items-center gap-3">
        <div className="bg-foundation-bg h-10 w-10 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-1.5">
          <div className="bg-foundation-bg h-5 w-3/4 rounded-md" />
          <div className="bg-foundation-bg h-4 w-1/4 rounded-md" />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="bg-foundation-bg h-4 w-1/2 rounded-md" />
        <div className="bg-foundation-bg h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}
