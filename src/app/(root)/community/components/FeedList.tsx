'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import RotateIcon from '@/assets/icon/rotate_icon.svg';
import FilterIcon from '@/assets/icon/filter_icon.svg';
import { SortDropdown } from '@/components/ui/SortDropdown';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/date';
import {
  getInterviewStatusLabel,
  getMemoirTypeLabel,
  getPositionLabel,
} from '@/utils/labelUtils';
import { memoirInfiniteQueries } from '@/queries/memoirOptions';
import { PATH } from '@/constants/path';
import type {
  InterviewStatus,
  Memoir,
  MemoirType,
  Position,
} from '@/types/memoirTypes';

type SortType = 'latest' | 'popularity';

const sortOptions: { label: string; value: SortType }[] = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popularity' },
];

export default function FeedList() {
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const positionFilter = searchParams.get('position');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery(
    memoirInfiniteQueries.all({ position: positionFilter || undefined }),
  );

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const allMemoirs = useMemo(
    () => data?.pages.flatMap(page => page.data.result) || [],
    [data],
  );

  const countText = hasNextPage ? `${allMemoirs.length}+` : allMemoirs.length;

  const sortedMemoirs = useMemo(() => {
    const sorted = [...allMemoirs];
    switch (selectedSort) {
      case 'latest':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case 'popularity':
        return sorted;
      default:
        return sorted;
    }
  }, [selectedSort, allMemoirs]);

  const handleResetFilter = () => {
    router.push(PATH.COMMUNITY.MAIN.path);
  };

  const handleOverlayClick = () => {
    setIsSortPopoverOpen(false);
  };

  return (
    <div className="relative">
      {isSortPopoverOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/50 transition-opacity duration-200"
        />
      )}
      <header className="border-foundation-box flex items-center justify-between border-t-[3px] border-b px-5 py-4">
        <div className="flex items-center gap-1">
          <h3 className="typo-body-02 text-white">피드</h3>
          <span className="text-foundation-disabled typo-subhead-02">
            {countText}
          </span>
        </div>
        <SortDropdown
          options={sortOptions}
          value={selectedSort}
          onValueChange={setSelectedSort}
          isOpen={isSortPopoverOpen}
          setIsOpen={setIsSortPopoverOpen}
          dropdownClassName="-translate-x-4"
        />
      </header>
      <div
        className={cn(
          'flex items-center px-5 py-4',
          positionFilter ? 'justify-between' : 'justify-end',
        )}
      >
        {positionFilter && (
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={handleResetFilter}
          >
            <RotateIcon />
            <Chip
              text={getPositionLabel(positionFilter as Position)}
              isSelected={true}
              onClick={handleResetFilter}
            />
          </div>
        )}
        <Link href={PATH.COMMUNITY.JOB_FILTER.path}>
          <div className="flex items-center gap-1">
            <FilterIcon />
            <span className="typo-subhead-02 text-foundation-primary">
              {PATH.COMMUNITY.JOB_FILTER.label}
            </span>
          </div>
        </Link>
      </div>
      {isPending ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <FeedItemSkeleton key={index} />
          ))}
        </>
      ) : isError ? (
        <div className="py-10 text-center">피드를 불러오지 못했습니다.</div>
      ) : sortedMemoirs.length === 0 ? (
        <div className="py-10 text-center">
          {positionFilter
            ? '해당 직무의 회고가 없습니다.'
            : '작성된 회고가 없습니다.'}
        </div>
      ) : (
        sortedMemoirs.map((memoir, index) => {
          if (sortedMemoirs.length === index + 1) {
            return (
              <div ref={lastElementRef} key={memoir.id}>
                <FeedItem memoir={memoir} isFirst={index === 0} />
              </div>
            );
          }
          return (
            <FeedItem key={memoir.id} memoir={memoir} isFirst={index === 0} />
          );
        })
      )}

      {isFetchingNextPage && <FeedItemSkeleton />}
    </div>
  );
}

function FeedItem({ memoir, isFirst }: { memoir: Memoir; isFirst: boolean }) {
  const interviewTypeClassName =
    memoir.type === '퀵 회고'
      ? 'text-secondary-btn'
      : 'text-foundation-primary';
  const interviewStatusClassName =
    memoir.interviewStatus === '합격'
      ? 'text-primary-btn'
      : memoir.interviewStatus === '결과 대기중'
        ? 'text-foundation-secondary'
        : 'text-warning';

  const detailPath = PATH.MEMOIR.DETAIL.path.replace('[id]', String(memoir.id));

  return (
    <Link href={detailPath}>
      <div
        className={cn(
          'border-foundation-box border-b px-5 pb-4',
          isFirst ? 'pt-0' : 'pt-4',
        )}
      >
        <div className="mb-1 flex items-center">
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
            {getMemoirTypeLabel(memoir.type as MemoirType)}
          </Badge>
        </div>

        <div className="typo-subhead-long-03 mb-1 flex items-center gap-2">
          <span className="text-foundation-primary">{memoir.companyName}</span>
          <span className="text-foundation-disabled">|</span>
          <span className="text-foundation-primary">
            {getPositionLabel(memoir.position as Position)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="typo-caption flex items-center gap-1">
            <span className="text-foundation-primary">Q.</span>
            <span className="text-foundation-secondary truncate">
              {memoir.firstQuestion}
            </span>
          </div>

          <span className="text-foundation-disabled typo-caption">
            {formatTimeAgo(memoir.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeedItemSkeleton() {
  return (
    <div className="border-foundation-box border-b px-5 py-4">
      <div className="animate-pulse">
        <div className="mb-2 flex items-center gap-2">
          <div className="bg-foundation-bg h-5 w-12 rounded-md" />
          <div className="bg-foundation-bg h-5 w-14 rounded-md" />
        </div>
        <div className="bg-foundation-bg mb-2 h-5 w-3/4 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="bg-foundation-bg h-4 w-1/2 rounded-md" />
          <div className="bg-foundation-bg h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
