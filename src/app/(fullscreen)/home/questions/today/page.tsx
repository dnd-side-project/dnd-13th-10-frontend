import { Header } from '@/components/ui/Header';

import TodayQuestionDetail from './components/TodayQuestionDetail';

export const metadata = {
  title: '오늘의 질문',
  description: '오늘의 질문에 대한 상세 정보를 확인하세요.',
};

export default function TodayQuestion() {
  return (
    <div>
      <Header title="오늘의 질문" />
      <TodayQuestionDetail />
    </div>
  );
}
