'use client';

import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { memoirQueries } from '@/queries/memoirOptions';

const FEATURED_MEMOIR_ID = 20;

export function useTodayQuestion() {
  const {
    data: memoirDetailResponse,
    isPending,
    isError,
  } = useQuery(memoirQueries.detail(FEATURED_MEMOIR_ID));

  const todayQuestionData = useMemo(() => {
    const memoirDetail = memoirDetailResponse?.data;
    if (!memoirDetail || !memoirDetail.questions?.[0]) {
      return null;
    }

    return {
      memoir: memoirDetail,
      question: memoirDetail.questions[0],
    };
  }, [memoirDetailResponse]);

  return {
    todayQuestionData,
    isPending,
    isError,
  };
}
