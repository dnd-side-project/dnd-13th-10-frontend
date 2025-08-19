import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/ui/Header';
import { PATH } from '@/constants/path';
import RightArrow from '@/assets/icon/right_arrow_icon.svg';

const MY_PAGE_METADATA = [
  { href: PATH.MY_PAGE.MEMOIRS.path, label: PATH.MY_PAGE.MEMOIRS.label },
  { href: PATH.MY_PAGE.TEMP_SAVED.path, label: PATH.MY_PAGE.TEMP_SAVED.label },
  { href: PATH.MY_PAGE.LIKE.path, label: PATH.MY_PAGE.LIKE.label },
  { href: PATH.MY_PAGE.COMMENTS.path, label: PATH.MY_PAGE.COMMENTS.label },
  { href: PATH.MY_PAGE.SCRAP.path, label: PATH.MY_PAGE.SCRAP.label },
];
const ETC = ['로그아웃', '탈퇴하기'];

export default function MyPage() {
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

function MenuSection({
  title,
  items = [],
}: {
  title: string;
  items?: { href: string; label: string }[] | string[];
}) {
  return (
    <section className="bg-foundation-box rounded-xl p-4">
      <h3 className="text-foundation-strong typo-subhead-03 mb-2">{title}</h3>
      <ul className="flex flex-col">
        {Array.isArray(items)
          ? items.map(item =>
              typeof item === 'string' ? (
                <li
                  key={item}
                  className="flex cursor-pointer items-center justify-between py-2"
                >
                  <span className="text-foundation-primary typo-body-02">
                    {item}
                  </span>
                  <RightArrow />
                </li>
              ) : (
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
              ),
            )
          : null}
      </ul>
    </section>
  );
}
