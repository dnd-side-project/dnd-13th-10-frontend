import { Title } from '@/components/ui/Title';
import { formatDateToYYMMDDHHMM } from '@/utils/date';
import type { ScheduleDetailData } from '@/types/scheduleTypes';

interface Props {
  data: ScheduleDetailData;
}

export default function ScheduleDetailContent({ data }: Props) {
  return (
    <div className="py-8">
      <Title title={data.companyName} className="mb-5" />
      <section>
        <div className="bg-foundation-box rounded-xl px-5 py-4">
          <div className="flex flex-col gap-2">
            <InfoRow label="직무" content={data.position} />
            <InfoRow
              label="면접일"
              content={formatDateToYYMMDDHHMM(data.interviewDateTime)}
            />
            <InfoRow label="면접장소" content={data.location} />
            <InfoRow label="면접유형" content={data.interviewStep} />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, content }: { label: string; content: string }) {
  return (
    <div className="text-foundation-primary typo-body-02 flex items-start gap-3">
      <span className="shrink-0">{label}</span>
      <span>{content}</span>
    </div>
  );
}
