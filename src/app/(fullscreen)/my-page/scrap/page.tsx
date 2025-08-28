'use client';

import { Header } from '@/components/ui/Header';

import MemoirList from '../components/MemoirList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { memoirInfiniteQueries } from '@/queries/memoirOptions';
import { useEffect, useRef } from 'react';

export default function MyScrapPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(memoirInfiniteQueries.bookmarked());

  const memoirs = data?.pages.flatMap(p => p.data.result) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loaderRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(loaderRef.current);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="flex min-h-screen flex-col">
      <Header title="내가 스크랩한 글" />
      <div className="my-8">
        <MemoirList memoirs={memoirs} emptyText="스크랩한 글이 없어요." />
        <div ref={loaderRef} />
      </div>
    </main>
  );
}
