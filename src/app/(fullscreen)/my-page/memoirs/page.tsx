import { Header } from '@/components/ui/Header';

import MyMemoirsView from '../components/MyMemoirsView';

export default function MyMemoirsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="나의 회고 리스트" />
      <MyMemoirsView />
    </main>
  );
}
