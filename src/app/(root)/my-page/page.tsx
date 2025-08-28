'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/ui/Header';
import { PATH } from '@/constants/path';
import RightArrow from '@/assets/icon/right_arrow_icon.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userMutations } from '@/queries/userOptions';
import { useRouter } from 'next/navigation';

type MenuItemLink = { href: string; label: string };
type MenuItemAction = { label: string; onClick: () => void };
type MenuItem = MenuItemLink | MenuItemAction;

const MY_PAGE_METADATA = [
  { href: PATH.MY_PAGE.MEMOIRS.path, label: PATH.MY_PAGE.MEMOIRS.label },
  { href: PATH.MY_PAGE.TEMP_SAVED.path, label: PATH.MY_PAGE.TEMP_SAVED.label },
  { href: PATH.MY_PAGE.LIKE.path, label: PATH.MY_PAGE.LIKE.label },
  { href: PATH.MY_PAGE.COMMENTS.path, label: PATH.MY_PAGE.COMMENTS.label },
  { href: PATH.MY_PAGE.SCRAP.path, label: PATH.MY_PAGE.SCRAP.label },
];

export default function MyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useMutation(userMutations.logout(queryClient));
  const withdraw = useMutation(userMutations.withdraw(queryClient));

  const ETC = [
    {
      label: '로그아웃',
      onClick: () =>
        logout.mutate(undefined, {
          onSuccess: () => router.replace('/'),
        }),
    },
    {
      label: '탈퇴하기',
      onClick: () =>
        withdraw.mutate(undefined, {
          onSuccess: () => router.replace('/'),
        }),
    },
  ];

  return (
    <>
      <Header title="마이페이지" showBackButton={false} />
      <main className="px-5 pt-7">
        <div className="flex flex-col gap-4">
          <section className="bg-foundation-box rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-foundation-secondary h-12 w-12 rounded-full" />
                <span className="typo-subhead-03 text-white">SEED</span>
              </div>
              <Link href={PATH.MY_PAGE.PROFILE_MODIFY.path}>
                <Badge shape="round">{PATH.MY_PAGE.PROFILE_MODIFY.label}</Badge>
              </Link>
            </div>
          </section>

          <MenuSection title="나의 활동" items={MY_PAGE_METADATA} />
          <MenuSection title="기타" items={ETC} />
        </div>
      </main>
    </>
  );
}

function isLinkItem(item: MenuItem): item is MenuItemLink {
  return 'href' in item && typeof item.href === 'string';
}

function MenuSection({
  title,
  items = [],
}: {
  title: string;
  items?: MenuItem[] | string[];
}) {
  return (
    <section className="bg-foundation-box rounded-xl p-4">
      <h3 className="text-foundation-strong typo-subhead-03 mb-2">{title}</h3>
      <ul className="flex flex-col">
        {Array.isArray(items) &&
          items.map(item =>
            typeof item === 'string' ? (
              <li key={item} className="flex items-center justify-between py-2">
                <span className="text-foundation-primary typo-body-02">
                  {item}
                </span>
                <RightArrow />
              </li>
            ) : isLinkItem(item) ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex cursor-pointer items-center justify-between py-2"
                >
                  <span className="text-foundation-primary typo-body-02">
                    {item.label}
                  </span>
                  <RightArrow />
                </Link>
              </li>
            ) : (
              <li key={`action-${item.label}`}>
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex w-full items-center justify-between py-2 text-left"
                >
                  <span className="text-foundation-primary typo-body-02">
                    {item.label}
                  </span>
                  <RightArrow />
                </button>
              </li>
            ),
          )}
      </ul>
    </section>
  );
}
