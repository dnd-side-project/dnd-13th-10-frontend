'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';

import Logo from '@/assets/logo/logo_icon.svg';
import { Badge } from '@/components/ui/Badge';
import { calculateDaysAgo } from '@/utils/date';
import { cn } from '@/utils/cn';
import { PATH } from '@/constants/path';
import type { HotMemoir } from '@/types/memoirTypes';

import { mockHotMemoirs } from '../mocks/mockHotMemoirs';

interface Props {
  isFullWidth?: boolean;
}

export default function HotMemoirList({ isFullWidth = true }: Props) {
  const topMemoirs = [...mockHotMemoirs].sort(
    (a, b) => b.weeklyViewCount - a.weeklyViewCount,
  );

  return (
    <section className={cn('flex flex-col gap-4', isFullWidth && '-mx-5')}>
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <h3 className="typo-subhead-03 text-foundation-primary">
            이번주 HOT 회고
          </h3>
          <span className="typo-body-01 text-foundation-secondary">10</span>
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
          {topMemoirs.map(memoir => (
            <SwiperSlide key={memoir.id} style={{ width: '80%' }}>
              <HotMemoirItem memoir={memoir} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function HotMemoirItem({ memoir }: { memoir: HotMemoir }) {
  const className =
    memoir.type === 'QUICK' ? 'text-secondary-btn' : 'text-primary-btn';

  return (
    <section className="bg-foundation-box rounded-xl px-[14px] py-4">
      <Badge size="xsmall" shape="minimal" className={className}>
        {memoir.type === 'QUICK' ? '퀵회고' : '일반회고'}
      </Badge>

      <div className="mt-3 mb-2 flex items-center gap-3">
        <figure className="h-10 w-10 shrink-0 rounded-full">
          {memoir.imageUrl ? (
            <Image
              src={memoir.imageUrl}
              alt={memoir.userName}
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
