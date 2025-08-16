import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';
import { PATH } from '@/constants/path';

import MemoirOptionCard from './components/MemoirOptionCard';

export const metadata: Metadata = {
  title: '회고 작성',
  description: '면접에 대한 회고를 퀵/일반 모드로 작성해보세요.',
};

const quickMemoirFeatures = [
  '간단한 면접 정보 기록',
  '질문 작성 가능',
  '자유 기재로 빠르게 작성',
];

const generalMemoirFeatures = [
  '상세 면접 정보 기록',
  '질문과 답변 작성 가능',
  '기술 태그·링크 첨부로 자료 확장 가능',
];

export default function NewMemoirPage() {
  return (
    <>
      <Header title="회고 작성" />

      <div className="mt-5 flex flex-col gap-5 px-5">
        <MemoirOptionCard
          title={PATH.MEMOIR.QUICK.label}
          timeEstimate="~5 min"
          features={quickMemoirFeatures}
          buttonVariants="yellow"
          badgeTextColor="text-secondary-btn"
          href={PATH.MEMOIR.QUICK.path}
        />

        <MemoirOptionCard
          title={PATH.MEMOIR.GENERAL.label}
          timeEstimate="10-15 min"
          features={generalMemoirFeatures}
          buttonVariants="primary"
          badgeTextColor="text-primary-btn"
          href={PATH.MEMOIR.GENERAL.path}
        />
      </div>
    </>
  );
}
