import { EmptyState } from '@/components/ui/Empty';
import type { Schedule } from '@/types/scheduleTypes';

import ScheduleItem from './ScheduleItem';

interface Props {
  schedules: Schedule[];
  emptyText: string;
}

export default function ScheduleList({ schedules, emptyText }: Props) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 px-5">
        {schedules.length > 0 ? (
          schedules.map(schedule => (
            <ScheduleItem key={schedule.id} schedule={schedule} />
          ))
        ) : (
          <EmptyState text={emptyText} />
        )}
      </div>
    </>
  );
}
