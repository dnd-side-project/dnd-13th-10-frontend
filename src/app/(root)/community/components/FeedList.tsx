'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import FilterIcon from '@/assets/icon/filter_icon.svg';
import { mockMemoirs } from '@/app/(fullscreen)/my-page/mocks/memoir';
import { SortDropdown } from '@/components/ui/SortDropdown';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { formatTimeAgo } from '@/utils/date';
import {
  getInterviewStatusLabel,
  getMemoirTypeLabel,
  getPositionLabel,
} from '@/utils/labelUtils';
import { INTERVIEW_STATUS, MEMOIR_TYPES } from '@/constants/code';
import type {
  InterviewStatus,
  Memoir,
  MemoirType,
  Position,
} from '@/types/memoirTypes';
import { PATH } from '@/constants/path';

type SortType = 'latest' | 'popularity';

const sortOptions: { label: string; value: SortType }[] = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popularity' },
];

export default function FeedList() {
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  const sortedMemoirs = useMemo(() => {
    const sorted = [...mockMemoirs];
    switch (selectedSort) {
      case 'latest':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      //   case 'popularity':
      //     return sorted.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
      default:
        return sorted;
    }
  }, [selectedSort]);

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
            {sortedMemoirs.length}
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
      <div className="px-5 py-4">
        <Link href={PATH.COMMUNITY.JOB_FILTER.path}>
          <div className="flex items-center justify-end gap-1">
            <FilterIcon />
            <span className="typo-subhead-02 text-foundation-primary">
              {PATH.COMMUNITY.JOB_FILTER.label}
            </span>
          </div>
        </Link>
      </div>
      {sortedMemoirs.map((memoir, index) => (
        <FeedItem key={memoir.id} memoir={memoir} isFirst={index === 0} />
      ))}
    </div>
  );
}

function FeedItem({ memoir, isFirst }: { memoir: Memoir; isFirst: boolean }) {
  const interviewTypeClassName =
    memoir.type === MEMOIR_TYPES.QUICK
      ? 'text-secondary-btn'
      : 'text-foundation-primary';
  const interviewStatusClassName =
    memoir.interviewStatus === INTERVIEW_STATUS.PASS
      ? 'text-primary-btn'
      : memoir.interviewStatus === INTERVIEW_STATUS.PENDING
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
