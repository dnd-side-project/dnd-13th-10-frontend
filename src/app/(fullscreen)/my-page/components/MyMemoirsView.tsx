'use client';

import { useMemo, useState } from 'react';

import { Chip } from '@/components/ui/Chip';
import { MEMOIR_TYPES } from '@/constants/code';
import type { MemoirType } from '@/types/memoirTypes';

import { mockMemoirs } from '../mocks/memoir';

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

  const allMemoirs = mockMemoirs;

  const filteredMemoirs = useMemo(() => {
    if (selectedFilter === 'all') {
      return allMemoirs;
    }
    return allMemoirs.filter(memoir => memoir.type === selectedFilter);
  }, [allMemoirs, selectedFilter]);

  return (
    <div className="flex flex-1 flex-col">
      {allMemoirs.length > 0 && (
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
      <MemoirList memoirs={filteredMemoirs} emptyText="작성된 회고가 없어요." />
    </div>
  );
}
