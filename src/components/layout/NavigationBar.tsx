'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';
import { PATH } from '@/constants/path';
import HomeIcon from '@/assets/navigation/home_icon.svg';
import CalendarIcon from '@/assets/navigation/calendar_icon.svg';
import CommunityIcon from '@/assets/navigation/community_icon.svg';
import UserIcon from '@/assets/navigation/user_icon.svg';

const navItems = [
  { label: PATH.HOME.label, href: PATH.HOME.path, icon: HomeIcon },
  { label: PATH.CALENDAR.label, href: PATH.CALENDAR.path, icon: CalendarIcon },
  {
    label: PATH.COMMUNITY.label,
    href: PATH.COMMUNITY.path,
    icon: CommunityIcon,
  },
  { label: PATH.MY.label, href: PATH.MY.path, icon: UserIcon },
];

export default function NavigationBar() {
  const pathName = usePathname();

  const isActive = (path: string) => {
    if (path === PATH.HOME.path) {
      return pathName === PATH.HOME.path;
    }
    return pathName === path || pathName.startsWith(path + '/');
  };

  return (
    <nav className="bg-foundation-bg pb-nav-safe fixed right-0 bottom-0 left-0 z-10 flex w-full items-center justify-between px-11 pt-3">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-0.5"
          aria-current={isActive(href) ? 'page' : undefined}
        >
          <Icon
            className={cn(
              'transition-colors duration-200',
              isActive(href) ? 'text-blue-400' : 'text-foundation-disabled',
            )}
            strokeWidth={isActive(href) ? 2 : 1.5}
          />
          <span
            className={cn(
              'typo-caption transition-colors duration-200',
              isActive(href) ? 'text-blue-400' : 'text-foundation-disabled',
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
