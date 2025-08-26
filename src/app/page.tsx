import OnboardingView from '@/components/onboarding/OnboardingView';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('devseed_token')?.value;
  const sp = (await searchParams) ?? {};
  const cb = typeof sp.callbackUrl === 'string' ? sp.callbackUrl : '/home';

  if (hasToken) {
    redirect(cb);
  }

  return <OnboardingView />;
}
