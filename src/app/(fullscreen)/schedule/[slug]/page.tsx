import { Metadata } from 'next';

import { getScheduleDetail } from '@/apis/scheduleApi';

import ScheduleDetailView from './components/ScheduleDetailView';

export const metadata: Metadata = {
  title: '일정 상세',
  description: '면접에 대한 상세한 일정을 확인해보세요.',
};

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function ScheduleDetailPage({ params }: Params) {
  const { id } = await params;
  const response = await getScheduleDetail(id);
  const scheduleData = response.data;

  return <ScheduleDetailView data={scheduleData} />;
}
