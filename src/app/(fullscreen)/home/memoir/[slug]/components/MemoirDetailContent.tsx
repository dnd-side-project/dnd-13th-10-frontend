import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Title } from '@/components/ui/Title';
import { cn } from '@/utils/cn';
import { formatDateToYYMMDD } from '@/utils/date';
import type { MemoirData, Question } from '@/types/memoirTypes';

interface Props {
  data: MemoirData;
}

export default function MemoirDetailContent({ data }: Props) {
  const hasAnswers = data.questions.some(question => !!question.answer);
  const interviewTypeParts = [
    data.interviewStep,
    data.interviewFormat,
    data.interviewMethod,
  ];
  const interviewTypeString = interviewTypeParts.filter(Boolean).join(' | ');

  return (
    <div className="flex flex-col gap-8 py-7">
      <section>
        <Title title="면접 정보" />
        <ContentBox className="flex flex-col gap-2">
          <InfoRow label="면접일">
            {formatDateToYYMMDD(data.interviewDatetime)}
          </InfoRow>
          <InfoRow label="직무">{data.position}</InfoRow>
          <InfoRow label="유형">{interviewTypeString}</InfoRow>
        </ContentBox>
      </section>

      <section>
        <Title title={hasAnswers ? '질문과 답변' : '면접 질문'} />
        <ContentBox>
          <div className="flex flex-col gap-5">
            {data.questions.map(question => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </div>
        </ContentBox>
      </section>

      <section>
        <Title title="면접 후기" />
        <div className="flex flex-col gap-2">
          <ContentBox>
            <div className="flex flex-col gap-2">
              <InfoRow label="분위기">{data.interviewMood}</InfoRow>
              {data.satisfactionNote && (
                <InfoRow label="만족도">{data.satisfactionNote}</InfoRow>
              )}
              <InfoRow label="난이도">{data.interviewLevel}</InfoRow>
              <InfoRow label="면접 결과">
                <Badge
                  shape="minimal"
                  size="xsmall"
                  className="text-primary-btn"
                >
                  {data.interviewStatus}
                </Badge>
              </InfoRow>
              <InfoRow label="공개여부">
                <Badge
                  shape="minimal"
                  size="xsmall"
                  className="text-foundation-primary"
                >
                  {data.isPublic ? '공개' : '비공개'}
                </Badge>
              </InfoRow>
            </div>
          </ContentBox>

          <ContentBox>
            <h3 className="typo-subhead-03 text-foundation-primary">
              자유기재
            </h3>
            <p className="text-foundation-secondary typo-body-long-01">
              {data.freeNote}
            </p>
          </ContentBox>
        </div>
      </section>

      {data.url && (
        <section>
          <Title title="첨부 또는 링크" />
          <ContentBox className="flex flex-col gap-2">
            <h3 className="typo-subhead-03 text-foundation-primary">URL</h3>
            <a
              className="text-primary-btn typo-body-02 break-all whitespace-pre-wrap"
              href={data.url}
              target="_blank"
            >
              {data.url}
            </a>
          </ContentBox>
        </section>
      )}
    </div>
  );
}

function ContentBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn('bg-foundation-box rounded-xl px-5 py-4', className)}
    >
      {children}
    </article>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="typo-body-02 flex items-center gap-3">
      <span className="text-foundation-primary">{label}</span>
      <span className="text-foundation-secondary">{children}</span>
    </div>
  );
}

function QuestionItem({ question }: { question: Question }) {
  return (
    <div className="flex flex-col gap-2" key={question.id}>
      <Badge
        shape="minimal"
        size="xsmall"
        className="text-foundation-primary"
        key={question.id}
      >
        {question.questionType}
      </Badge>

      <div className="flex items-start gap-3">
        <span className="text-secondary-btn typo-subhead-03">Q.</span>
        <p className="text-foundation-primary typo-subhead-03">
          {question.title}
        </p>
      </div>

      {question.answer && (
        <div className="text-foundation-secondary typo-body-long-01 flex items-start gap-3">
          <span>A.</span>
          <span>{question.answer}</span>
        </div>
      )}
    </div>
  );
}
