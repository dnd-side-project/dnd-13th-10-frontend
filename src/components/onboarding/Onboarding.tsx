import Logo from '@/assets/logo/logo_icon.svg';
import KakaoLogo from '@/assets/icon/kakao_icon.svg';

import { Button } from '../ui/Button';
import { toBase64Url } from '@/utils/toBase64Url';

export default function Onboarding({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  const devseed = process.env.NEXT_PUBLIC_DEVSEED_BASE_URL!;
  const app = process.env.NEXT_PUBLIC_APP_BASE_URL!;

  const cb = searchParams?.callbackUrl || '/home';
  const redirectUri = `${app}/`;
  const state = toBase64Url(cb);

  const loginUrl = new URL('/oauth2/authorization/kakao', devseed);
  loginUrl.searchParams.set('redirect_uri', redirectUri);
  loginUrl.searchParams.set('state', state);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex flex-1 flex-col justify-center px-[30px]">
        <Logo width={25} height={39} />
        <h1 className="typo-display-02 text-foundation-strong mt-6">
          면접을 기록하고 <br />
          회고하세요
        </h1>
        <span className="typo-subhead-long-03 text-foundation-secondary mt-[14px]">
          쌓인 경험이 당신의 자산이 됩니다.
        </span>
      </section>

      <footer className="mb-8 px-5">
        <Button
          variant="yellow"
          className="flex items-center gap-1 rounded-full"
          size="large"
          href={loginUrl.toString()}
        >
          <KakaoLogo />
          카카오로 시작하기
        </Button>
      </footer>
    </div>
  );
}
