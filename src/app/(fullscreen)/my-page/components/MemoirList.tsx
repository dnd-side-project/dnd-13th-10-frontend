import type { Memoir } from '@/types/memoirTypes';

import MemoirItem from './MemoirItem';
import { EmptyState } from '@/components/ui/Empty';

interface Props {
  memoirs: Memoir[];
  hideBadge?: boolean;
  emptyText: string;
}

export default function MemoirList({ memoirs, hideBadge, emptyText }: Props) {
  return (
    <>
      <div className="mt-8 flex flex-1 flex-col gap-3 px-5">
        {memoirs.length > 0 ? (
          memoirs.map(memoir => (
            <MemoirItem key={memoir.id} memoir={memoir} hideBadge={hideBadge} />
          ))
        ) : (
          <EmptyState text={emptyText} />
        )}
      </div>
    </>
  );
}
