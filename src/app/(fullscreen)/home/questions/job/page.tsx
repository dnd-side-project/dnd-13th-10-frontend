import { Metadata } from 'next';

import QuestionContainer from '../components/QuestionContainer';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '직무질문',
  description: '면접에서 등장한 직무 질문에 대해서 확인해보세요.',
};

export default function JobQuestionsPage() {
  return (
    <>
      <QuestionContainer
        initialQuestions={mockQuestionCategory}
        title="직무질문"
      />
    </>
  );
}
