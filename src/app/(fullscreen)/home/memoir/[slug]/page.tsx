import { getMemoirDetail } from '@/apis/memoir/memoirDetailApi';
import { Header } from '@/components/ui/Header';

import MemoirDetailContent from './components/MemoirDetailContent';
import MemoirDetailAction from './components/MemoirDetailAction';

interface Params {
  params: {
    id: string;
  };
}

export default async function MemoirDetailPage({ params }: Params) {
  const { id } = params;
  const response = await getMemoirDetail(id);
  const memoirData = response.data;

  return (
    <div className="flex h-screen flex-col">
      <Header
        title={memoirData.url ? '일반회고' : '퀵회고'}
        showBackButton={true}
      />
      <main className="no-scrollbar flex-1 overflow-y-auto px-5">
        <MemoirDetailContent data={memoirData} />
      </main>

      {memoirData.isPublic && (
        <footer>
          <MemoirDetailAction isLike={false} />
        </footer>
      )}
    </div>
  );
}
