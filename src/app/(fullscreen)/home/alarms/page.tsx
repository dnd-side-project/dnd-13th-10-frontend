import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

import AlarmList from './components/AlarmList';

export const metadata: Metadata = {
  title: '알림',
  description: '면접 일정에 대한 알림을 확인하고 관리해보세요.',
};

export default function AlarmsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header title="알람" />
      <AlarmList />
    </main>
  );
}
