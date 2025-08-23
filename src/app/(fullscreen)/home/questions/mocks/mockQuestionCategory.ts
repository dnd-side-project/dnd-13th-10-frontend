import type { Question } from '@/types/memoirTypes';
import { QUESTION_TYPE } from '@/constants/code';

export const mockQuestionCategory: Question[] = [
  {
    id: 1,
    questionType: QUESTION_TYPE.PERSONALITY,
    content: '1분 자기소개를 부탁드립니다.',
    answer:
      '안녕하세요, 끊임없이 배우고 성장하는 개발자 OOO입니다. 저는 JavaScript와 TypeScript에 대한 깊은 이해를 바탕으로 React 환경에서 사용자 중심의 웹 애플리케이션을 개발해왔습니다. 특히 팀원들과의 원활한 소통과 협업을 중요하게 생각하며, 귀사의 서비스 가치를 높이는 데 기여하고 싶습니다.',
    displayOrder: 1,
  },
  {
    id: 2,
    questionType: QUESTION_TYPE.COMPANY,
    content: '우리 회사에 지원하게 된 동기는 무엇인가요?',
    answer:
      '귀사는 혁신적인 기술을 통해 꾸준히 시장을 선도하고 있으며, 특히 OOO 프로젝트에서 보여준 사용자 경험에 대한 깊은 고민에 큰 감명을 받았습니다. 저의 기술 스택과 성장 방향성이 귀사의 비전과 일치한다고 생각하여, 함께 성장하고 싶다는 생각에 지원하게 되었습니다.',
    displayOrder: 2,
  },
  {
    id: 3,
    questionType: QUESTION_TYPE.JOB,
    content: '지원하신 직무에 가장 중요한 역량은 무엇이라고 생각하시나요?',
    answer: null,
    displayOrder: 3,
  },
  {
    id: 4,
    questionType: QUESTION_TYPE.EXPERIENCE,
    content: '팀원들과 협업하여 문제를 해결했던 경험에 대해 말씀해주세요.',
    answer:
      '이전 프로젝트 진행 중, 예상치 못한 API 변경으로 인해 전체 기능이 마비된 적이 있습니다. 당시 프론트엔드 팀원들과 빠르게 현재 상황을 공유하고, 백엔드 팀과 긴급 회의를 소집하여 문제의 원인을 파악했습니다. 저는 임시 목업 데이터를 생성하여 다른 팀원들의 UI 작업을 지원하는 동시에, 백엔드 팀과 소통하며 새로운 API 명세에 맞춰 코드를 수정하여 하루 만에 문제를 해결한 경험이 있습니다.',
    displayOrder: 4,
  },
  {
    id: 5,
    questionType: QUESTION_TYPE.PERSONALITY,
    content:
      '본인의 장점과 단점은 무엇이며, 단점을 극복하기 위해 어떤 노력을 했나요?',
    answer: null,
    displayOrder: 5,
  },
  {
    id: 6,
    questionType: QUESTION_TYPE.EXPERIENCE,
    content:
      '살면서 가장 큰 도전을 했던 경험은 무엇인가요? 그 경험을 통해 무엇을 배웠나요?',
    answer: null,
    displayOrder: 6,
  },
  {
    id: 7,
    questionType: QUESTION_TYPE.COMPANY,
    content:
      '입사 후 우리 회사에서 이루고 싶은 목표나 포부가 있다면 무엇인가요?',
    answer:
      '단기적으로는 회사의 개발 문화와 프로세스에 빠르게 적응하여 팀에 기여하는 것이 목표입니다. 장기적으로는 제가 가진 프론트엔드 역량을 바탕으로 서비스의 성능을 개선하고 사용자 만족도를 높이는 핵심적인 역할을 수행하고 싶습니다.',
    displayOrder: 7,
  },
  {
    id: 8,
    questionType: QUESTION_TYPE.JOB,
    content:
      '해당 직무를 수행하기 위해 어떤 준비와 노력을 해왔는지 구체적으로 말씀해주세요.',
    answer: null,
    displayOrder: 8,
  },
  {
    id: 9,
    questionType: QUESTION_TYPE.PERSONALITY,
    content: '상사와 의견 충돌이 발생했을 때 어떻게 대처하시겠습니까?',
    answer: null,
    displayOrder: 9,
  },
  {
    id: 10,
    questionType: QUESTION_TYPE.COMPANY,
    content:
      '마지막으로 하고 싶은 말이나 궁금한 점이 있다면 편하게 질문해주세요.',
    answer:
      '네, 저는 팀의 기술 블로그를 인상 깊게 보았습니다. 혹시 입사하게 된다면 신입 사원도 기술 공유나 스터디 활동에 적극적으로 참여할 수 있는 기회가 있는지 궁금합니다.',
    displayOrder: 10,
  },
  {
    id: 11,
    questionType: QUESTION_TYPE.FOLLOW_UP,
    content:
      '방금 말씀하신 경험에서 본인이 맡았던 역할은 구체적으로 무엇이었나요?',
    answer: null,
    displayOrder: 11,
  },
  {
    id: 12,
    questionType: QUESTION_TYPE.FOLLOW_UP,
    content: '그 결정으로 인해 어떤 결과가 있었나요? 예상했던 결과였나요?',
    answer: null,
    displayOrder: 12,
  },
];
