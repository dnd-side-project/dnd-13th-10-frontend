import { Metadata } from 'next';

import QuestionContainer from '../components/QuestionContainer';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '인성질문',
  description: '면접에서 등장한 인성 질문에 대해서 확인해보세요.',
};

export default function PersonalityQuestionsPage() {
  return (
    <>
      <QuestionContainer
        initialQuestions={mockQuestionCategory}
        title="인성질문"
      />
    </>
  );
}
