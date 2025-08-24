import { formatDateToYYMMDD } from '@/utils/date';
import type { Memoir } from '@/types/memoirTypes';

const mockTodayQuestion: Memoir = {
  id: 1,
  type: '퀵회고',
  interviewStatus: '합격',
  firstQuestion: '삼성전자의 주가는 앞으로 어떻게 될까요?',
  companyName: '삼성전자',
  position: '데이터 분석',
  createdAt: '2025-07-28',
};

export default function TodayQuestion() {
  const data = mockTodayQuestion;

  return (
    <section className="bg-foundation-box rounded-xl p-5">
      <h3 className="typo-subhead-02 text-foundation-primary mb-2">
        오늘의 질문
      </h3>
      <div className="typo-subhead-03 mb-2 flex items-center gap-1">
        <span className="text-secondary-btn">Q.</span>
        <span className="text-foundation-primary">{data.firstQuestion}</span>
      </div>
      <div className="typo-body-long-01 text-foundation-secondary flex items-center gap-2">
        <span>{formatDateToYYMMDD(data.createdAt)}</span>
        <span>|</span>
        <span>{data.companyName}</span>
      </div>
    </section>
  );
}
