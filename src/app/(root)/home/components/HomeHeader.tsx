import Link from 'next/link';

import BellIcon from '@/assets/icon/bell_icon.svg';
import Logo from '@/assets/logo/logo_icon.svg';
import SeedIcon from '@/assets/logo/seed_icon.svg';
import { PATH } from '@/constants/path';

export default function HomeHeader() {
  return (
    <header className="py-[7px]">
      <div className="flex items-center justify-between">
        <Link href={PATH.HOME.path}>
          <div className="flex h-15 cursor-pointer items-center gap-2">
            <Logo width={17} height={26} />
            <SeedIcon width={69} height={15} />
          </div>
        </Link>
        <Link href={PATH.ALARM.path}>
          <BellIcon />
        </Link>
      </div>
    </header>
  );
}
