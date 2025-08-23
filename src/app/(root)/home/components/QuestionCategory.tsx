import Link from 'next/link';

import Company from '@/assets/icon/company_icon.svg';
import Experience from '@/assets/icon/experience_icon.svg';
import Fit from '@/assets/icon/fit_icon.svg';
import Followup from '@/assets/icon/followup_icon.svg';
import Job from '@/assets/icon/job_icon.svg';
import { PATH } from '@/constants/path';

const categoryItems = [
  { icon: <Fit />, ...PATH.QUESTIONS.PERSONALITY },
  { icon: <Job />, ...PATH.QUESTIONS.JOB },
  { icon: <Experience />, ...PATH.QUESTIONS.EXPERIENCE },
  { icon: <Company />, ...PATH.QUESTIONS.COMPANY },
  { icon: <Followup />, ...PATH.QUESTIONS.FOLLOW_UP },
];

export default function QuestionCategory() {
  return (
    <div className="mt-[18px] flex w-full items-center justify-between">
      {categoryItems.map(category => (
        <Link
          key={category.label}
          href={category.path}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="bg-foundation-box rounded-full p-3">
            {category.icon}
          </div>
          <span className="typo-body-long-01 text-white">{category.label}</span>
        </Link>
      ))}
    </div>
  );
}
