import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: '인성질문',
  description: '면접에서 등장한 인성 질문에 대해서 확인해보세요.',
};

export default function PersonalityQuestionsPage() {
  return (
    <>
      <Header title="인성질문" />
    </>
  );
}
