import HomeHeader from './components/HomeHeader';
import QuestionCategory from './components/QuestionCategory';
import InterviewSchedule from './components/InterviewSchedule';
import MemoirStats from './components/MemoirStats';
import HotMemoir from './components/HotMemoir';

export default function HomePage() {
  return (
    <div className="px-5">
      <HomeHeader />
      <div className="flex flex-col gap-8">
        <QuestionCategory />
        <InterviewSchedule />
        <MemoirStats />
        <HotMemoir />
      </div>
    </div>
  );
}
