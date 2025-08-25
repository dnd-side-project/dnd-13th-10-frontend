'use client';

import OnboardingView from '@/components/onboarding/OnboardingView';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/home');
  }

  return <OnboardingView />;
}
