'use client';

import OnboardingView from '@/components/onboarding/OnboardingView';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') router.replace('/home');
  }, [status, router]);

  return <OnboardingView />;
}
