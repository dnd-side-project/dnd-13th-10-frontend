import { Header } from '@/components/ui/Header';
import SearchIcon from '@/assets/icon/search_icon.svg';

export default function WeeklyHotMemoirPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="이번주 HOT 회고" rightContent={<SearchIcon />} />
    </main>
  );
}
