'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import RotateIcon from '@/assets/icon/rotate_icon.svg';
import FilterIcon from '@/assets/icon/filter_icon.svg';
import { mockMemoirs } from '@/app/(fullscreen)/my-page/mocks/memoir';
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
import { PATH } from '@/constants/path';
import { INTERVIEW_STATUS, MEMOIR_TYPES } from '@/constants/code';
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const positionFilter = searchParams.get('position');

  const filteredAndSortedMemoirs = useMemo(() => {
    let filtered = mockMemoirs;
    if (positionFilter) {
      filtered = mockMemoirs.filter(
        memoir => memoir.position === positionFilter,
      );
    }

    const sorted = [...filtered];
    switch (selectedSort) {
      case 'latest':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      // 다른 옵션일 경우 추가 가능
      default:
        return sorted;
    }
  }, [selectedSort, positionFilter]);

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
            {filteredAndSortedMemoirs.length}
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
      {filteredAndSortedMemoirs.map((memoir, index) => (
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
