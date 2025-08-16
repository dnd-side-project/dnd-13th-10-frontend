import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: '일반회고 작성',
  description: '면접에 대한 상세한 회고를 작성해보세요.',
};

export default function GeneralMemoirPage() {
  return (
    <>
      <Header title="일반회고" />
    </>
  );
}
