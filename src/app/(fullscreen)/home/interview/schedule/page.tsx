import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: '일정 등록',
  description: '면접 일정을 등록하고 관리해보세요.',
};

export default function InterviewSchedulePage() {
  return (
    <>
      <Header title="일정 등록" />
    </>
  );
}
