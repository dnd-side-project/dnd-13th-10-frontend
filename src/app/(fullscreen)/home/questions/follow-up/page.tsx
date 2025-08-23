import { Metadata } from 'next';

import QuestionContainer from '../components/QuestionContainer';
import { mockQuestionCategory } from '../mocks/mockQuestionCategory';

export const metadata: Metadata = {
  title: '꼬리질문',
  description: '면접에서 등장한 꼬리 질문에 대해서 확인해보세요.',
};

export default function FollowUpQuestionsPage() {
  return (
    <>
      <QuestionContainer
        initialQuestions={mockQuestionCategory}
        title="꼬리질문"
      />
    </>
  );
}
