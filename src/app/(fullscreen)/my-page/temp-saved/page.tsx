import { Header } from '@/components/ui/Header';

import MemoirList from '../components/MemoirList';
import { mockMemoirs } from '../mocks/memoir';

export default function TempSavedPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="임시 저장한 글" />
      <div className="my-8">
        <MemoirList
          memoirs={mockMemoirs}
          hideBadge={true}
          emptyText="임시 저장한 글이 없어요."
        />
      </div>
    </main>
  );
}
