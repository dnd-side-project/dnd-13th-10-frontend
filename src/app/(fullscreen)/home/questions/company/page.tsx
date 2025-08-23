import { Metadata } from 'next';

import QuestionContainer from '../components/QuestionContainer';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '회사질문',
  description: '면접에서 등장한 회사 질문에 대해서 확인해보세요.',
};

export default function CompanyQuestionsPage() {
  return (
    <>
      <QuestionContainer
        initialQuestions={mockQuestionCategory}
        title="회사질문"
      />
    </>
  );
}
