'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';

import Logo from '@/assets/logo/logo_icon.svg';
import { Badge } from '@/components/ui/Badge';
import { calculateDaysAgo } from '@/utils/date';
import { cn } from '@/utils/cn';
import { PATH } from '@/constants/path';
import { memoirQueries } from '@/queries/memoirOptions';
import type { HotMemoir } from '@/types/memoirTypes';

interface Props {
  isFullWidth?: boolean;
}

export default function HotMemoirList({ isFullWidth = true }: Props) {
  const {
    data: hotMemoirData,
    isPending,
    isError,
  } = useQuery(memoirQueries.hot());

  const topMemoirs = (hotMemoirData?.data || []).sort(
    (a, b) => b.weeklyViewCount - a.weeklyViewCount,
  );

  if (isError || (!isPending && topMemoirs.length === 0)) {
    return null;
  }

  return (
    <section className={cn('flex flex-col gap-4', isFullWidth && '-mx-5')}>
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <h3 className="typo-subhead-03 text-foundation-primary">
            이번주 HOT 회고
          </h3>
          {!isPending && (
            <span className="typo-body-01 text-foundation-secondary">
              {topMemoirs.length}
            </span>
          )}
        </div>
        <Link href={PATH.MEMOIR.HOT.path}>
          <span className="typo-body-01 text-foundation-secondary">
            전체보기
          </span>
        </Link>
      </div>
      <div>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={12}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
        >
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index} style={{ width: '80%' }}>
                  <HotMemoirItemSkeleton />
                </SwiperSlide>
              ))
            : topMemoirs.map(memoir => (
                <SwiperSlide key={memoir.id} style={{ width: '80%' }}>
                  <Link
                    href={PATH.MEMOIR.DETAIL.path.replace(
                      '[id]',
                      String(memoir.id),
                    )}
                  >
                    <HotMemoirItem memoir={memoir} />
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}

export function HotMemoirItem({ memoir }: { memoir: HotMemoir }) {
  const memoirTypeclassName =
    memoir.type === '퀵 회고' ? 'text-secondary-btn' : 'text-primary-btn';
  const interviewStatusClassName =
    memoir.interviewStatus === '합격'
      ? 'text-primary-btn'
      : memoir.interviewStatus === '결과 대기중'
        ? 'text-foundation-secondary'
        : 'text-warning';

  return (
    <section className="bg-foundation-box rounded-xl px-[14px] py-4">
      {memoir.interviewStatus && (
        <Badge
          size="xsmall"
          shape="minimal"
          className={interviewStatusClassName}
        >
          {memoir.interviewStatus}
        </Badge>
      )}
      <Badge size="xsmall" shape="minimal" className={memoirTypeclassName}>
        {memoir.type}
      </Badge>

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

        <div className="flex min-w-0 flex-col">
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

      <div className="typo-caption flex items-start gap-1">
        <span className="text-foundation-primary">Q.</span>
        <span className="text-foundation-secondary line-clamp-2 text-ellipsis">
          {memoir.firstQuestion}
        </span>
      </div>

      <div className="bg-foundation-divider my-2 h-px" />

      <div className="flex items-center justify-between">
        <div className="typo-caption flex items-center gap-1">
          <span className="text-foundation-secondary">조회수</span>
          <span className="text-secondary-btn">
            {memoir.weeklyViewCount.toLocaleString()}회
          </span>
        </div>
        <span className="typo-caption text-foundation-secondary">
          {calculateDaysAgo(memoir.createdAt)}
        </span>
      </div>
    </section>
  );
}

function HotMemoirItemSkeleton() {
  return (
    <div className="bg-foundation-box animate-pulse rounded-xl px-[14px] py-4">
      <div className="bg-foundation-bg mb-3 h-5 w-14 rounded-md" />
      <div className="mb-2 flex items-center gap-3">
        <div className="bg-foundation-bg h-10 w-10 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-1.5">
          <div className="bg-foundation-bg h-5 w-full rounded-md" />
          <div className="bg-foundation-bg h-4 w-1/3 rounded-md" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="bg-foundation-bg h-4 w-full rounded-md" />
        <div className="bg-foundation-bg h-4 w-5/6 rounded-md" />
      </div>
      <div className="bg-foundation-divider my-2 h-px" />
      <div className="flex items-center justify-between">
        <div className="bg-foundation-bg h-4 w-1/4 rounded-md" />
        <div className="bg-foundation-bg h-4 w-1/5 rounded-md" />
      </div>
    </div>
  );
}
