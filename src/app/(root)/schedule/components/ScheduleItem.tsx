import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { formatDateToYYMMDDHHMM } from '@/utils/date';
import { PATH } from '@/constants/path';
import type { Schedule } from '@/types/scheduleTypes';

interface Props {
  schedule: Schedule;
}

const memoirTypeStyles: Record<string, { text: string; className: string }> = {
  QUICK: { text: '퀵회고', className: 'text-secondary-btn' },
  GENERAL: { text: '일반회고', className: 'text-primary-btn' },
};

export default function ScheduleItem({ schedule }: Props) {
  const router = useRouter();

  const {
    id,
    companyName,
    position,
    interviewDate,
    interviewStep,
    remainDate,
    memoirTypes,
  } = schedule;

  const formattedDate = formatDateToYYMMDDHHMM(interviewDate);

  const handleNavigateToDetail = () => {
    router.push(PATH.SCHEDULE.DETAIL.path.replace('[id]', String(id)));
  };

  const StatusDisplay = (() => {
    const isUpcoming = typeof remainDate === 'number' && remainDate >= 0;
    const needsMemoir = !memoirTypes || memoirTypes.length === 0;

    if (isUpcoming) {
      return (
        <p
          className={cn('typo-headline', {
            'text-secondary-btn': remainDate <= 7,
            'text-foundation-strong': remainDate > 7,
          })}
        >
          D-{remainDate === 0 ? 'Day' : remainDate}
        </p>
      );
    }
    if (needsMemoir) {
      return (
        <Link href={PATH.MEMOIR.CREATE.path} onClick={e => e.stopPropagation()}>
          <Badge>{PATH.MEMOIR.CREATE.label}</Badge>
        </Link>
      );
    }
    return null;
  })();

  return (
    <div onClick={handleNavigateToDetail} className="cursor-pointer">
      <div className="bg-foundation-box rounded-xl px-5 py-3">
        <div className="flex items-center gap-3">
          {memoirTypes && memoirTypes.length > 0 && (
            <div className="flex items-center gap-1">
              {memoirTypes.map(type => (
                <Badge
                  key={type}
                  shape="minimal"
                  size="xsmall"
                  className={memoirTypeStyles[type].className}
                >
                  {memoirTypeStyles[type].text}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-[6px]">
            <h3 className="text-foundation-primary typo-subhead-long-03">
              {companyName}
            </h3>
            <span className="typo-subhead-02 text-foundation-disabled">|</span>
            <p className="text-foundation-primary typo-subhead-long-03">
              {position}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-x-2">
            <span className="typo-body-long-01 text-foundation-disabled">
              면접일 : {formattedDate}
            </span>
            <span className="typo-subhead-02 text-foundation-disabled">|</span>
            <span className="typo-body-long-01 text-foundation-disabled">
              {interviewStep}
            </span>
          </div>

          {StatusDisplay}
        </div>
      </div>
    </div>
  );
}
