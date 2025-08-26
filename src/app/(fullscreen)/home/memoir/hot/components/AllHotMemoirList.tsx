import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/logo/logo_icon.svg';
import { Badge } from '@/components/ui/Badge';
import { INTERVIEW_STATUS, MEMOIR_TYPES } from '@/constants/code';
import { cn } from '@/utils/cn';
import {
  getInterviewStatusLabel,
  getMemoirTypeLabel,
} from '@/utils/labelUtils';
import type {
  HotMemoir,
  InterviewStatus,
  MemoirType,
} from '@/types/memoirTypes';
import { mockHotMemoirs } from '@/app/(root)/home/mocks/mockHotMemoirs';
import { formatTimeAgo } from '@/utils/date';
import { PATH } from '@/constants/path';

export default function AllHotMemoirList() {
  return (
    <div>
      {mockHotMemoirs.map((memoir, index) => (
        <AllHotMemoirItem
          key={memoir.id}
          memoir={memoir}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

function AllHotMemoirItem({
  memoir,
  isFirst,
}: {
  memoir: HotMemoir;
  isFirst: boolean;
}) {
  const interviewTypeClassName =
    memoir.type === MEMOIR_TYPES.QUICK
      ? 'text-secondary-btn'
      : 'text-foundation-primary';
  const interviewStatusClassName =
    memoir.interviewStatus === INTERVIEW_STATUS.PASS
      ? 'text-primary-btn'
      : memoir.interviewStatus === INTERVIEW_STATUS.PENDING
        ? 'text-foundation-secondary'
        : 'text-warning';

  const memoirDetailPath = PATH.MEMOIR.DETAIL.path.replace(
    '[id]',
    String(memoir.id),
  );

  return (
    <Link href={memoirDetailPath}>
      <div
        className={cn(
          'border-foundation-box border px-5 pb-4',
          isFirst ? 'pt-0' : 'pt-4',
        )}
      >
        <div className="mb-3 flex items-center">
          {memoir.interviewStatus && (
            <Badge
              size="xsmall"
              shape="minimal"
              className={cn('mr-2', interviewStatusClassName)}
            >
              {getInterviewStatusLabel(
                memoir.interviewStatus as InterviewStatus,
              )}
            </Badge>
          )}
          <Badge
            size="xsmall"
            shape="minimal"
            className={interviewTypeClassName}
          >
            {getMemoirTypeLabel(memoir.type as MemoirType)}
          </Badge>
        </div>

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

          <div className="mb-2 flex min-w-0 flex-col">
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

        <div className="flex items-start justify-between">
          <div className="typo-caption flex min-w-0 items-start gap-1">
            <span className="text-foundation-primary">Q.</span>
            <span className="text-foundation-secondary truncate">
              {memoir.firstQuestion}
            </span>
          </div>

          <span className="typo-caption text-foundation-secondary ml-6 shrink-0">
            {formatTimeAgo(memoir.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
