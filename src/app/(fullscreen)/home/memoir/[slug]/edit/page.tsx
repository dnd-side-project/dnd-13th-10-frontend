import { cookies } from 'next/headers';

import { getMemoirDetails } from '@/apis/memoirApi';

import MemoirEditClient from './components/MemoirEditClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const memoirId = Number(slug);

  const cookieStore = await cookies();
  const cookie = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const response = await getMemoirDetails(memoirId, cookie);
  const initialData = response.data;

  return <MemoirEditClient initialData={initialData} />;
}
