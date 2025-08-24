import { Header } from '@/components/ui/Header';

import MemoirList from '../components/MemoirList';
import { mockMemoirs } from '../mocks/memoir';

export default function MyLikesPage() {
  return (
    <main className="flex h-screen flex-col">
      <Header title="내가 좋아요한 글" />
      <div className="mt-8">
        <MemoirList memoirs={mockMemoirs} emptyText="좋아요한 글이 없어요." />
      </div>
    </main>
  );
}
