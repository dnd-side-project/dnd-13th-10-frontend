import { cookies } from 'next/headers';

import { getScheduleDetails } from '@/apis/scheduleApi';

import ScheduleView from '../../new/components/ScheduleView';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ScheduleEditPage({ params }: PageProps) {
  const id = Number((await params).slug);

  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');
  const response = await getScheduleDetails({ scheduleId: id, cookie });
  const scheduleData = response.data;

  if (!scheduleData) {
    return <div>일정을 찾을 수 없습니다.</div>;
  }

  return (
    <ScheduleView mode="edit" scheduleId={id} initialData={scheduleData} />
  );
}
