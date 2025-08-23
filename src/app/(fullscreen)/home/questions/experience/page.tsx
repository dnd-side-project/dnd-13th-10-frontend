import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';
import SearchIcon from '@/assets/icon/search_icon.svg';

import QuestionList from '../components/QuestionList';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '경험질문',
  description: '면접에서 등장한 자신만의 경험 질문에 대해서 확인해보세요.',
};

export default function ExperienceQuestionsPage() {
  return (
    <>
      <Header title="경험질문" rightContent={<SearchIcon />} />
      <section className="px-5">
        <QuestionList questions={mockQuestionCategory} />
      </section>
    </>
  );
}
