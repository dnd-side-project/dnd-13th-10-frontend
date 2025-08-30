'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import RightArrowIcon from '@/assets/icon/right_arrow_icon.svg';
import RightArrowIcon2 from '@/assets/icon/right_arrow_icon2.svg';
import { PATH } from '@/constants/path';
import { formatScheduleDate, calculateRemainDate } from '@/utils/date';
import { cn } from '@/utils/cn';
import { scheduleQueries } from '@/queries/scheduleOptions';
import type { Schedule } from '@/types/scheduleTypes';

export default function InterviewSchedule() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const today = new Date();

  const {
    data: scheduleData,
    isPending,
    isError,
  } = useQuery(scheduleQueries.all());

  const allSchedules = scheduleData?.data.result || [];

  const upcomingSchedules = allSchedules
    .filter(schedule => {
      if (!schedule.interviewDateTime) return false;
      const interviewDate = new Date(schedule.interviewDateTime);
      if (isNaN(interviewDate.getTime())) return false;

      return interviewDate >= today;
    })
    .sort((a, b) => {
      if (!a.interviewDateTime) return 1;
      if (!b.interviewDateTime) return -1;

      return (
        new Date(a.interviewDateTime).getTime() -
        new Date(b.interviewDateTime).getTime()
      );
    });

  if (isError) {
    return <div>일정을 불러오는 데 실패했습니다.</div>;
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    swiper?.slideNext();
  };

  return (
    <div className="flex flex-col gap-2">
      {isPending ? (
        <ScheduleCardSkeleton />
      ) : upcomingSchedules.length > 0 ? (
        <div>
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={20}
            slidesPerView={1}
            onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          >
            {upcomingSchedules.map(schedule => (
              <SwiperSlide key={schedule.id}>
                <Link
                  href={PATH.SCHEDULE.DETAIL.path.replace(
                    '[id]',
                    String(schedule.id),
                  )}
                >
                  <ScheduleCard
                    schedule={schedule}
                    currentIndex={activeIndex}
                    totalCount={upcomingSchedules.length}
                    onNextClick={handleNext}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <section className="bg-foundation-box rounded-xl px-5 py-4 text-center">
          <p className="typo-body-long-01 text-foundation-secondary">
            다가오는 면접 일정이 없어요.
          </p>
        </section>
      )}

      <Link href={PATH.SCHEDULE.NEW.path}>
        <section className="bg-foundation-box flex items-center justify-between rounded-xl px-5 py-2.5">
          <span className="text-foundation-primary typo-subhead-03">
            {PATH.SCHEDULE.NEW.label}
          </span>
          <RightArrowIcon />
        </section>
      </Link>
    </div>
  );
}

function ScheduleCard({
  schedule,
  currentIndex,
  totalCount,
  onNextClick,
}: {
  schedule: Schedule;
  currentIndex: number;
  totalCount: number;
  onNextClick: (e: React.MouseEvent) => void;
}) {
  const remainDate = calculateRemainDate(schedule.interviewDateTime);
  const { date, time } = formatScheduleDate(schedule.interviewDateTime);
  const dDayText = remainDate === 0 ? 'D-Day' : `D-${remainDate}`;

  return (
    <section className="bg-foundation-box cursor-pointer rounded-xl p-5">
      <div className="mb-[5px] flex items-center justify-between">
        <span className="text-foundation-primary typo-subhead-02">
          다가오는 면접
        </span>
        <div className="bg-foundation-bg rounded-full px-2 py-[3px]">
          <div className="flex items-center gap-1">
            <span className="text-primary-btn typo-subhead-01">
              {currentIndex + 1}
            </span>
            <span className="text-foundation-disabled typo-subhead-01">|</span>
            <span className="text-foundation-disabled typo-subhead-01">
              {totalCount}
            </span>
            <RightArrowIcon2
              className="cursor-pointer"
              onClick={onNextClick}
              aria-label="Next slide"
            />
          </div>
        </div>
      </div>
      <span className="text-foundation-strong typo-subhead-long-03">
        {schedule.companyName}
      </span>
      <div className="flex items-end justify-between">
        <div className="text-foundation-secondary typo-body-long-01 flex items-center">
          <span>{date}</span>
          <span className="mx-2">|</span>
          <span>{time}</span>
          <span className="mx-2">|</span>
          <span>{schedule.interviewStep}</span>
        </div>
        <p
          className={cn(
            'typo-headline',
            remainDate <= 7 ? 'text-secondary-btn' : 'text-foundation-strong',
          )}
        >
          {dDayText}
        </p>
      </div>
    </section>
  );
}

function ScheduleCardSkeleton() {
  return (
    <section className="bg-foundation-box rounded-xl p-5">
      <div className="animate-pulse">
        <div className="mb-[5px] flex items-center justify-between">
          <div className="bg-foundation-bg h-5 w-20 rounded-md" />
          <div className="bg-foundation-bg h-6 w-24 rounded-full" />
        </div>
        <div className="bg-foundation-bg mt-2 h-6 w-3/5 rounded-md" />
        <div className="mt-4 flex items-end justify-between">
          <div className="bg-foundation-bg h-5 w-2/3 rounded-md" />
          <div className="bg-foundation-bg h-8 w-1/4 rounded-md" />
        </div>
      </div>
    </section>
  );
}
