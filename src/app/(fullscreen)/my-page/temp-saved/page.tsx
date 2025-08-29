'use client';

import { useQuery } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';

import { memoirQueries } from '@/queries/memoirOptions';
import { PATH } from '@/constants/path';

import MemoirList from '../components/MemoirList';

export default function TempSavedPage() {
  const { data, isPending, isError } = useQuery(memoirQueries.tmp());

  const memoirs = data?.data ?? [];
  const isEmpty = !isPending && !isError && memoirs.length === 0;

  return (
    <main className="flex min-h-screen flex-col">
      <Header title="임시 저장한 글" />
      <div
        className={
          isEmpty ? 'flex flex-1 items-center justify-center' : 'my-8 flex-1'
        }
      >
        <MemoirList
          memoirs={memoirs}
          hideBadge={true}
          emptyText="임시 저장한 글이 없어요."
          itemHrefPattern={PATH.MEMOIR.EDIT.path}
        />
      </div>
    </main>
  );
}
