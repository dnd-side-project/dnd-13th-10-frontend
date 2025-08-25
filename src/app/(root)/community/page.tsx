import { Metadata } from 'next';
import { Suspense } from 'react';

import { Header } from '@/components/ui/Header';

import HotMemoirList from '../home/components/HotMemoirList';
import FeedList from './components/FeedList';
import FeedListSkeleton from './components/FeedListSkeleton';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '다양한 면접 경험을 공유하고, 서로의 지식을 나누어 보세요.',
};

export default function CommunityPage() {
  return (
    <main>
      <Header title="커뮤니티" showBackButton={false} />
      <div className="pt-6 pb-8">
        <HotMemoirList isFullWidth={false} />
      </div>
      <Suspense fallback={<FeedListSkeleton />}>
        <FeedList />
      </Suspense>
    </main>
  );
}
