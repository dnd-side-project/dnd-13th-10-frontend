import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getMemoirDetails } from '@/apis/memoirApi';
import { Header } from '@/components/ui/Header';
import { MEMOIR_TYPES } from '@/constants/code';

import MemoirDetailContent from './components/MemoirDetailContent';
import MemoirDetailAction from './components/MemoirDetailAction';

export const metadata: Metadata = {
  title: '면접 회고 상세',
  description: '면접에 대한 상세한 회고를 확인해보세요.',
};

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MemoirDetailPage({ params }: Params) {
  const slug = Number((await params).slug);

  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const response = await getMemoirDetails(slug, cookie);
  const memoirData = response.data;

  const headerTitle =
    memoirData.type === MEMOIR_TYPES.QUICK ? '퀵회고' : '일반회고';

  return (
    <div className="flex h-screen flex-col">
      <Header title={headerTitle} showBackButton={true} />
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
