import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { mockMemoirs } from '@/app/(fullscreen)/my-page/mocks/memoir';
import { MEMOIR_TYPES } from '@/constants/code';
import { PATH } from '@/constants/path';
import { getPositionLabel } from '@/utils/labelUtils';
import { formatDateToYYMMDD } from '@/utils/date';
import type { Memoir, Position } from '@/types/memoirTypes';

export default function MyMemoirList() {
  const recentMemoirs = [...mockMemoirs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 2);

  if (recentMemoirs.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-foundation-primary typo-subhead-03">
          나의 회고 리스트
        </h3>
        <Link href={PATH.MY_PAGE.MEMOIRS.path}>
          <span className="typo-body-long-01 text-foundation-secondary">
            전체보기
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {recentMemoirs.map(memoir => (
          <MyMemoirItem key={memoir.id} memoir={memoir} />
        ))}
      </div>
    </div>
  );
}

function MyMemoirItem({ memoir }: { memoir: Memoir }) {
  const memoirTypeDetails: Record<
    Memoir['type'],
    { text: string; className: string }
  > = {
    [MEMOIR_TYPES.QUICK]: {
      text: '퀵회고',
      className: 'text-secondary-btn',
    },
    [MEMOIR_TYPES.GENERAL]: {
      text: '일반회고',
      className: 'text-primary-btn',
    },
  };

  const { text, className } = memoirTypeDetails[memoir.type];

  return (
    <div className="bg-foundation-box rounded-lg p-3">
      <div className="mb-1 flex items-center gap-3">
        <Badge shape="minimal" size="xsmall" className={className}>
          {text}
        </Badge>
        <p className="text-foundation-primary typo-subhead-long-03 flex items-center gap-[6px]">
          <span>{memoir.companyName}</span>
          <span>ㆍ</span>
          <span>{getPositionLabel(memoir.position as Position)}</span>
        </p>
      </div>
      <span className="text-foundation-disabled typo-caption mr-1">
        작성일 :
      </span>
      <span className="text-foundation-disabled typo-caption">
        {formatDateToYYMMDD(memoir.createdAt)}
      </span>
    </div>
  );
}
