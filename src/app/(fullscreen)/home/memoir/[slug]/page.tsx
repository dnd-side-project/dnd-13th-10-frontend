import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getMemoirDetails } from '@/apis/memoirApi';

import MemoirDetailView from './components/MemoirDetailView';

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

  return <MemoirDetailView memoirData={memoirData} />;
}
