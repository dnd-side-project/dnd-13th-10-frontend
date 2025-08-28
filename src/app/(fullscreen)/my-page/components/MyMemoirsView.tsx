'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Chip } from '@/components/ui/Chip';
import { MEMOIR_TYPES } from '@/constants/code';
import type { MemoirType } from '@/types/memoirTypes';
import { memoirQueries } from '@/queries/memoirOptions';
import MemoirList from './MemoirList';

const filterChips: { label: string; value: 'all' | MemoirType }[] = [
  { label: '전체', value: 'all' },
  { label: '퀵회고', value: MEMOIR_TYPES.QUICK },
  { label: '일반회고', value: MEMOIR_TYPES.GENERAL },
];

export default function MyMemoirsView() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | MemoirType>(
    'all',
  );

  const apiSearchType: string =
    selectedFilter === 'all' ? 'ALL' : (selectedFilter as string);

  const { data, isPending, isError } = useQuery(
    memoirQueries.mine(apiSearchType),
  );

  const memoirs = data?.data ?? [];

  return (
    <div className="flex flex-1 flex-col">
      {/* 필터 칩 영역 */}
      {memoirs.length > 0 && (
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
      )}

      {!isPending && !isError && (
        <MemoirList memoirs={memoirs} emptyText="작성된 회고가 없어요." />
      )}
    </div>
  );
}
