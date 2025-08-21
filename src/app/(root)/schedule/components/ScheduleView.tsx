'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { Chip } from '@/components/ui/Chip';
import { PATH } from '@/constants/path';
import { SortDropdown } from '@/components/ui/SortDropdown';
import PlusIcon from '@/assets/icon/plus_icon3.svg';

import ScheduleList from './ScheduleList';
import { mockSchedules } from '../mocks/mockSchedule';

type ScheduleFilter = 'all' | 'upcoming' | 'past';
type SortType = 'registration' | 'imminent';

const filterChips: { label: string; value: ScheduleFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '진행예정', value: 'upcoming' },
  { label: '완료된 면접', value: 'past' },
];

const sortOptions: { label: string; value: SortType }[] = [
  { label: '면접 임박순', value: 'imminent' },
  { label: '등록순', value: 'registration' },
];

export default function ScheduleView() {
  const [selectedFilter, setSelectedFilter] = useState<ScheduleFilter>('all');
  const [selectedSort, setSelectedSort] = useState<SortType>('imminent');
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  const allSchedules = mockSchedules;

  const filteredSchedules = useMemo(() => {
    const now = new Date();

    let schedules;
    switch (selectedFilter) {
      case 'upcoming':
        schedules = allSchedules.filter(
          schedule => new Date(schedule.interviewDate) >= now,
        );
        break;
      case 'past':
        schedules = allSchedules.filter(
          schedule => new Date(schedule.interviewDate) < now,
        );
        break;
      case 'all':
      default:
        schedules = [...allSchedules];
        break;
    }

    return schedules.sort((a, b) => {
      if (selectedSort === 'imminent') {
        const isAUpcoming = a.remainDate !== undefined;
        const isBUpcoming = b.remainDate !== undefined;
        if (isAUpcoming && !isBUpcoming) return -1;
        if (!isAUpcoming && isBUpcoming) return 1;
        if (isAUpcoming && isBUpcoming) {
          return a.remainDate! - b.remainDate!;
        }
        return (
          new Date(b.interviewDate).getTime() -
          new Date(a.interviewDate).getTime()
        );
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [selectedFilter, selectedSort, allSchedules]);

  const handleOverlayClick = () => {
    setIsSortPopoverOpen(false);
  };

  return (
    <div className="relative flex flex-1 flex-col">
      {isSortPopoverOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/50 transition-opacity duration-200"
        />
      )}
      {allSchedules.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-8">
          <SortDropdown
            isOpen={isSortPopoverOpen}
            setIsOpen={setIsSortPopoverOpen}
            options={sortOptions}
            value={selectedSort}
            onValueChange={setSelectedSort}
          />
          <div className="flex items-center gap-2">
            {filterChips.map(chip => (
              <Chip
                key={chip.value}
                text={chip.label}
                isSelected={selectedFilter === chip.value}
                onClick={() => setSelectedFilter(chip.value)}
              />
            ))}
          </div>
        </div>
      )}
      <ScheduleList
        schedules={filteredSchedules}
        emptyText="면접 일정이 없어요."
      />

      <Link
        href={PATH.SCHEDULE.NEW.path}
        className="bg-primary-btn fixed right-5 bottom-24 flex h-14 w-14 items-center justify-center rounded-full"
      >
        <PlusIcon />
      </Link>
    </div>
  );
}
