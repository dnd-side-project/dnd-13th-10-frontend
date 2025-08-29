'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Chip } from '@/components/ui/Chip';
import { MEMOIR_TYPES } from '@/constants/code';
import { memoirQueries } from '@/queries/memoirOptions';
import type { MemoirType } from '@/types/memoirTypes';

const filterChips: { label: string; value: 'all' | MemoirType }[] = [
  { label: '전체', value: 'all' },
  { label: '퀵회고', value: MEMOIR_TYPES.QUICK },
  { label: '일반회고', value: MEMOIR_TYPES.GENERAL },
];

export default function MyMemoirsView() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | MemoirType>(
    'all',
  );

  const apiFilter = selectedFilter === 'all' ? '' : selectedFilter;

  const {
    data: memoirData,
    isPending,
    isError,
  } = useQuery(memoirQueries.mine(apiFilter));
  const filteredMemoirs = memoirData?.data || [];

  const FilterControls = (
    <div className="flex items-center gap-2 px-5 py-6">
      {filterChips.map(chip => (
        <Chip
          key={chip.value}
          text={chip.label}
          isSelected={selectedFilter === chip.value}
          onClick={() => setSelectedFilter(chip.value)}
        />
      ))}
    </div>
  );

  if (isError) {
    return (
      <div className="flex flex-1 flex-col">
        {FilterControls}
        <div className="px-5 text-center">
          회고를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {FilterControls}

      {isPending ? (
        <div className="flex flex-col gap-3 px-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <MemoirItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <MemoirList
          memoirs={filteredMemoirs}
          emptyText="작성된 회고가 없어요."
        />
      )}
    </div>
  );
}

function MemoirItemSkeleton() {
  return (
    <div className="bg-foundation-box rounded-lg p-3">
      <div className="animate-pulse space-y-2">
        <div className="flex items-center gap-3">
          <div className="bg-foundation-bg h-5 w-14 rounded-md" />
          <div className="bg-foundation-bg h-5 w-48 rounded-md" />
        </div>
        <div className="bg-foundation-bg h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}
