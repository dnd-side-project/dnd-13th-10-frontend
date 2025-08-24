import { Header } from '@/components/ui/Header';

import MemoirList from '../components/MemoirList';
import { mockMemoirs } from '../mocks/memoir';

export default function MyCommentsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="내가 댓글 남긴 글" />
      <div className="my-8">
        <MemoirList memoirs={mockMemoirs} emptyText="작성한 댓글이 없어요." />
      </div>
    </main>
  );
}
