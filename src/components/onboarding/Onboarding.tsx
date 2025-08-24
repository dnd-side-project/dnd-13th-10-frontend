'use client';

import { signIn } from 'next-auth/react';

import Logo from '@/assets/logo/logo_icon.svg';
import KakaoLogo from '@/assets/icon/kakao_icon.svg';

import { Button } from '../ui/Button';
import { PATH } from '@/constants/path';

export default function Onboarding() {
  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: PATH.HOME.path });
  };

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
          onClick={handleKakaoLogin}
        >
          <KakaoLogo />
          카카오로 시작하기
        </Button>
      </footer>
    </div>
  );
}
