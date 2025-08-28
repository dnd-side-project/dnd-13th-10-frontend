'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueries, userMutations } from '@/queries/userOptions';

import DeleteIcon from '@/assets/icon/delete_icon.svg';
import ClockIcon from '@/assets/icon/clock_icon.svg';

export default function RecentSearch() {
  const queryClient = useQueryClient();

  const {
    data: historyData,
    isPending,
    isError,
  } = useQuery(userQueries.history());

  const { mutate: deleteHistory, isPending: isDeletePending } = useMutation(
    userMutations.deleteHistory(queryClient),
  );

  const { mutate: deleteAllHistory, isPending: isDeleteAllPending } =
    useMutation(userMutations.deleteAllHistory(queryClient));

  const recentKeywords = historyData?.data || [];
  const isMutating = isDeletePending || isDeleteAllPending;

  if (isPending) {
    return <RecentSearchSkeleton />;
  }
  if (isError) {
    return <div>최근 검색어를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="py-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="typo-subhead-long-03 text-foundation-primary">
          최근 검색
        </h2>
        <button
          type="button"
          onClick={() => deleteAllHistory()}
          disabled={isMutating || recentKeywords.length === 0}
          className="typo-body-long-01 text-foundation-secondary cursor-pointer disabled:opacity-50"
        >
          전체 삭제
        </button>
      </div>

      <ul className="space-y-2">
        {recentKeywords.length > 0 ? (
          recentKeywords.map(keyword => (
            <li
              key={keyword.userSearchHistId}
              className="flex items-center justify-between"
            >
              <div className="flex cursor-pointer items-center gap-2">
                <ClockIcon />
                <span className="text-foundation-primary">
                  {keyword.content}
                </span>
              </div>
              <button
                onClick={() => deleteHistory(keyword.userSearchHistId)}
                disabled={isMutating}
                className="cursor-pointer disabled:opacity-50"
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div className="typo-body-long-01 text-foundation-secondary py-5 text-center">
            최근 검색 기록이 없어요.
          </div>
        )}
      </ul>
    </div>
  );
}

function RecentSearchSkeleton() {
  return (
    <div className="py-4">
      <div className="mb-6 flex animate-pulse items-center justify-between">
        <div className="bg-foundation-bg h-6 w-24 rounded" />
        <div className="bg-foundation-bg h-5 w-20 rounded" />
      </div>
      <ul className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className="flex animate-pulse items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="bg-foundation-bg h-6 w-6 rounded-full" />
              <div className="bg-foundation-bg h-5 w-32 rounded" />
            </div>
            <div className="bg-foundation-bg h-6 w-6 rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
