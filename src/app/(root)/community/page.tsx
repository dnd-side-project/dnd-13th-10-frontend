import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

import HotMemoirList from '../home/components/HotMemoirList';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '다양한 면접 경험을 공유하고, 서로의 지식을 나누어 보세요.',
};

export default function CommunityPage() {
  return (
    <main className="flex h-screen flex-col">
      <Header title="커뮤니티" showBackButton={false} />
      <div className="pt-6 pb-4">
        <HotMemoirList isFullWidth={false} />
      </div>
    </main>
  );
}
