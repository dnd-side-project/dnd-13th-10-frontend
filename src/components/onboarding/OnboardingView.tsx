'use client';

import { useState, useEffect } from 'react';

import { cn } from '@/utils/cn';
import Logo from '@/assets/logo/logo_icon.svg';
import SeedIcon from '@/assets/logo/seed_icon.svg';

import Onboarding from './Onboarding';

export default function OnboardingView() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen">
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out',
          showSplash ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex items-center gap-3">
          <Logo width={26} height={42} />
          <SeedIcon width={108} height={23} />
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500 ease-in-out',
          showSplash ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <Onboarding />
      </div>
    </main>
  );
}
