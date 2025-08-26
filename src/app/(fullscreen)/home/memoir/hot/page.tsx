import { Header } from '@/components/ui/Header';

import AllHotMemoirList from './components/AllHotMemoirList';

export default function WeeklyHotMemoirPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="이번주 HOT 회고" />
      <div className="flex-1 pt-5 pb-6">
        <AllHotMemoirList />
      </div>
    </main>
  );
}
