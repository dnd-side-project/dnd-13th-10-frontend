import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';
import SearchIcon from '@/assets/icon/search_icon.svg';

import QuestionList from '../components/QuestionList';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '꼬리질문',
  description: '면접에서 등장한 꼬리 질문에 대해서 확인해보세요.',
};

export default function FollowUpQuestionsPage() {
  return (
    <>
      <Header title="꼬리질문" rightContent={<SearchIcon />} />
      <section className="px-5">
        <QuestionList questions={mockQuestionCategory} />
      </section>
    </>
  );
}
