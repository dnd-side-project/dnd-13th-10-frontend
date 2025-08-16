import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: '꼬리질문',
  description: '면접에서 등장한 꼬리 질문에 대해서 확인해보세요.',
};

export default function FollowUpQuestionsPage() {
  return (
    <>
      <Header title="꼬리질문" />
    </>
  );
}
