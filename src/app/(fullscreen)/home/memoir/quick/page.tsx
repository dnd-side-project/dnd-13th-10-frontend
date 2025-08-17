import { Metadata } from 'next';

import QuickMemoirView from './components/QuickMemoirView';

export const metadata: Metadata = {
  title: '퀵회고 작성',
  description: '면접에 대한 짧고 간결한 회고를 작성해보세요.',
};

export default function QuickMemoirPage() {
  return <QuickMemoirView />;
}
