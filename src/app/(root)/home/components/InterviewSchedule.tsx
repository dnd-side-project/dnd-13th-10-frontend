import Link from 'next/link';

import { PATH } from '@/constants/path';
import RightArrowIcon from '@/assets/icon/right_arrow_icon.svg';

export default function InterviewSchedule() {
  return (
    <Link href={PATH.SCHEDULE.NEW.path}>
      <section className="bg-foundation-box flex items-center justify-between rounded-xl px-5 py-2.5">
        <span className="text-foundation-primary typo-subhead-03">
          {PATH.SCHEDULE.NEW.label}
        </span>
        <RightArrowIcon />
      </section>
    </Link>
  );
}
