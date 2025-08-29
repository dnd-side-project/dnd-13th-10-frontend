import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { QUESTION_TYPE_LABELS } from '@/constants/labels';
import { MEMOIR_TYPES, QUESTION_TYPE } from '@/constants/code';
import { getQuestionCategories } from '@/apis/generalApi';
import type { Question } from '@/types/memoirTypes';

import QuestionContainer from '../components/QuestionContainer';

const typeMapping = {
  company: {
    label: QUESTION_TYPE_LABELS[QUESTION_TYPE.COMPANY],
    code: QUESTION_TYPE.COMPANY,
  },
  experience: {
    label: QUESTION_TYPE_LABELS[QUESTION_TYPE.EXPERIENCE],
    code: QUESTION_TYPE.EXPERIENCE,
  },
  personality: {
    label: QUESTION_TYPE_LABELS[QUESTION_TYPE.PERSONALITY],
    code: QUESTION_TYPE.PERSONALITY,
  },
  job: {
    label: QUESTION_TYPE_LABELS[QUESTION_TYPE.JOB],
    code: QUESTION_TYPE.JOB,
  },
  follow_up: {
    label: QUESTION_TYPE_LABELS[QUESTION_TYPE.FOLLOW_UP],
    code: QUESTION_TYPE.FOLLOW_UP,
  },
};

interface Props {
  params: Promise<{ type: keyof typeof typeMapping }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const categoryInfo = typeMapping[type];
  const title = categoryInfo?.label || '질문';
  return {
    title: `${title} 질문`,
    description: `${title} 질문을 확인하고 회고를 작성해보세요.`,
  };
}

export default async function QuestionCategoryPage({ params }: Props) {
  const { type } = await params;
  const categoryInfo = typeMapping[type];

  let initialQuestions: Question[] = [];
  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const response = await getQuestionCategories({
    searchReq: {
      type: categoryInfo.code,
      memoirType: MEMOIR_TYPES.QUICK,
      condition: '',
      isMine: false,
    },
    cookie,
  });
  initialQuestions = response.data.result;

  return (
    <QuestionContainer
      initialQuestions={initialQuestions}
      title={categoryInfo.label}
      questionType={categoryInfo.code}
    />
  );
}
