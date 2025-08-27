import { Metadata } from 'next';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { scheduleQueries } from '@/queries/scheduleOptions';

import ScheduleDetailView from './components/ScheduleDetailView';

export const metadata: Metadata = {
  title: '일정 상세',
  description: '면접에 대한 상세한 일정을 확인해보세요.',
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ScheduleDetailPage({ params }: Props) {
  const id = Number((await params).slug);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(scheduleQueries.detail(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleDetailView scheduleId={id} />
    </HydrationBoundary>
  );
}
