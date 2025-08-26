import OnboardingView from '@/components/onboarding/OnboardingView';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get(
    process.env.JWT_COOKIE_NAME || 'devseed_token',
  )?.value;
  if (hasToken) {
    redirect(searchParams?.callbackUrl || '/home');
  }

  return <OnboardingView />;
}
