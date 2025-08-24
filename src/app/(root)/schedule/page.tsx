import { Metadata } from 'next';

import { Header } from '@/components/ui/Header';

import ScheduleView from './components/ScheduleView';

export const metadata: Metadata = {
  title: '일정 관리',
  description: '면접 일정을 확인하고, 새로운 일정을 추가해보세요.',
};

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="일정" showBackButton={false} />
      <ScheduleView />
    </main>
  );
}
