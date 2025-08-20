import { Header } from '@/components/ui/Header';

import MemoirList from '../components/MemoirList';
import { mockMemoirs } from '../mocks/memoir';

export default function MyScrapPage() {
  return (
    <main className="flex h-screen flex-col">
      <Header title="내가 스크랩한 글" />
      <MemoirList memoirs={mockMemoirs} emptyText="스크랩한 글이 없어요." />
    </main>
  );
}
