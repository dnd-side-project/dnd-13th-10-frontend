'use client';

import { useQuery } from '@tanstack/react-query';

import { alarmQueries } from '@/queries/alarmOptions';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Empty';
import { formatTimeAgo } from '@/utils/date';
import type { Alarm } from '@/types/alarmTypes';

export default function AlarmList() {
  const { data, isPending } = useQuery(alarmQueries.list());

  const alarms = data?.data || [];

  return (
    <section className="flex flex-1 flex-col">
      {isPending ? (
        <div className="flex flex-col gap-4 p-5">
          {Array.from({ length: 3 }, (_, index) => (
            <AlarmItemSkeleton key={index} />
          ))}
        </div>
      ) : alarms.length > 0 ? (
        alarms.map((alarm, index) => <AlarmItem key={index} alarm={alarm} />)
      ) : (
        <EmptyState text="아직 도착한 알림이 없어요." />
      )}
    </section>
  );
}

function AlarmItem({ alarm }: { alarm: Alarm }) {
  return (
    <div className="border-foundation-box border-b p-5">
      <Badge size="xsmall" shape="minimal" className="text-foundation-primary">
        {alarm.notificationCategory}
      </Badge>
      <p className="typo-subhead-02 text-foundation-primary mt-2 mb-1">
        {alarm.content}
      </p>
      <span className="text-foundation-secondary typo-body-long-01">
        {formatTimeAgo(alarm.createdAt)}
      </span>
    </div>
  );
}

function AlarmItemSkeleton() {
  return (
    <div className="border-foundation-box bg-foundation-box animate-pulse rounded border-b p-5">
      <div className="bg-foundation-bg mb-2 h-5 w-20 rounded-md" />
      <div className="bg-foundation-bg mb-1.5 h-5 w-full rounded-md" />
      <div className="bg-foundation-bg h-4 w-1/4 rounded-md" />
    </div>
  );
}
