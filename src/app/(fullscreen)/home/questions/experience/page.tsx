import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: '경험질문',
  description: '면접에서 등장한 자신만의 경험 질문에 대해서 확인해보세요.',
};

export default function ExperienceQuestionsPage() {
  return (
    <>
      <Header title="경험질문" />
    </>
  );
}
