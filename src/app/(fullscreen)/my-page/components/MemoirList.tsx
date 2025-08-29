import type { ApiMemoirItem } from '@/types/memoirTypes';

import MemoirItem from './MemoirItem';
import { EmptyState } from '@/components/ui/Empty';

interface Props {
  memoirs: ApiMemoirItem[];
  hideBadge?: boolean;
  emptyText: string;
  itemHrefPattern?: string;
}

export default function MemoirList({
  memoirs,
  hideBadge,
  emptyText,
  itemHrefPattern,
}: Props) {
  return (
    <>
      <div className="mb-5 flex flex-1 flex-col gap-3 px-5">
        {memoirs.length > 0 ? (
          memoirs.map(memoir => (
            <MemoirItem
              key={memoir.id}
              memoir={memoir}
              hideBadge={hideBadge}
              hrefPattern={itemHrefPattern}
            />
          ))
        ) : (
          <EmptyState text={emptyText} />
        )}
      </div>
    </>
  );
}
