'use client';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { memoirQueries } from '@/queries/memoirOptions';

export default function MemoirStats() {
  const { data, isPending } = useQuery(memoirQueries.mine(''));
  const memoirCount = data?.data?.length ?? 0;

  return (
    <section className="bg-foundation-box flex flex-col gap-4 rounded-xl p-5">
      <div className="typo-subhead-03 flex items-center justify-between">
        <span className="text-foundation-strong">지금까지 기록한 회고</span>
        <p>
          {isPending ? (
            <span className="text-primary-btn">-</span>
          ) : (
            <>
              <span className="text-primary-btn">{memoirCount}</span>
              <span className="text-foundation-strong">개</span>
            </>
          )}
        </p>
      </div>
      <Button size="large" variant="yellow" href={PATH.MEMOIR.CREATE.path}>
        {PATH.MEMOIR.CREATE.label}
      </Button>
    </section>
  );
}
