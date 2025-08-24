import { Metadata } from 'next';

import HomeHeader from './components/HomeHeader';
import QuestionCategory from './components/QuestionCategory';
import InterviewSchedule from './components/InterviewSchedule';
import MemoirStats from './components/MemoirStats';
import HotMemoirList from './components/HotMemoirList';
import MyMemoirList from './components/MyMemoirList';
import TodayQuestion from './components/TodayQuestion';

export const metadata: Metadata = {
  title: 'SEED를 통해',
  description:
    'SEED에 오신 것을 환영합니다! 면접 회고를 작성하고, 질문 카테고리를 확인하며, 면접 일정을 관리해보세요.',
};

export default function HomePage() {
  return (
    <div className="px-5">
      <HomeHeader />
      <div className="mt-[18px] flex flex-col gap-8">
        <TodayQuestion />
        <QuestionCategory />
        <InterviewSchedule />
        <MemoirStats />
        <MyMemoirList />
        <HotMemoirList />
      </div>
    </div>
  );
}
