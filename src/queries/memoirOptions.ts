import {
  infiniteQueryOptions,
  mutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import * as memoirApi from '@/apis/memoirApi';
import type { MemoirsRequest } from '@/types/memoirTypes';

import { memoirKeys } from './queryKeys';

const DEFAULT_PAGE_SIZE = 10;

export const memoirQueries = {
  all: () =>
    queryOptions({
      queryKey: memoirKeys.lists(),
      queryFn: memoirApi.getAllMemoirs,
    }),
  detail: (memoirId: number) =>
    queryOptions({
      queryKey: memoirKeys.detail(memoirId),
      queryFn: () => memoirApi.getMemoirDetails(memoirId),
    }),
  hot: () =>
    queryOptions({
      queryKey: memoirKeys.hot(),
      queryFn: memoirApi.getHotMemoirs,
    }),
  mine: (searchType: string) =>
    queryOptions({
      queryKey: memoirKeys.mine(searchType),
      queryFn: () => memoirApi.getMyMemoirs(searchType),
    }),
  tmp: () =>
    queryOptions({
      queryKey: memoirKeys.tmp(),
      queryFn: memoirApi.getMyTmpMemoirs,
    }),
  comments: (memoirId: number) =>
    queryOptions({
      queryKey: memoirKeys.comments(memoirId),
      queryFn: () => memoirApi.getMemoirComments(memoirId),
    }),
};

export const memoirInfiniteQueries = {
  liked: () =>
    infiniteQueryOptions({
      queryKey: memoirKeys.liked({}),
      queryFn: ({ pageParam }) =>
        memoirApi.getMyLikedMemoirs({
          cursor: pageParam,
          size: DEFAULT_PAGE_SIZE,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => {
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
      },
    }),

  commented: () =>
    infiniteQueryOptions({
      queryKey: memoirKeys.commented({}),
      queryFn: ({ pageParam }) =>
        memoirApi.getMyCommentedMemoirs({
          cursor: pageParam,
          size: DEFAULT_PAGE_SIZE,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => {
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
      },
    }),

  bookmarked: () =>
    infiniteQueryOptions({
      queryKey: memoirKeys.bookmarked({}),
      queryFn: ({ pageParam }) =>
        memoirApi.getMyBookmarkedMemoirs({
          cursor: pageParam,
          size: DEFAULT_PAGE_SIZE,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => {
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
      },
    }),
};

export const memoirMutations = {
  create: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (newData: MemoirsRequest) => memoirApi.createMemoir(newData),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: memoirKeys.lists() }),
    }),
  update: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (updatedData: Partial<MemoirsRequest>) =>
        memoirApi.updateMemoir(updatedData),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: memoirKeys.lists() });
        if (variables.type) {
          queryClient.invalidateQueries({
            queryKey: memoirKeys.detail(Number(variables.type)),
          });
        }
      },
    }),
  delete: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (memoirId: number) => memoirApi.deleteMemoir(memoirId),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: memoirKeys.lists() }),
    }),
  toggleLike: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (memoirId: number) => memoirApi.toggleLikeMemoir(memoirId),
      onSuccess: (_, memoirId) =>
        queryClient.invalidateQueries({
          queryKey: memoirKeys.detail(memoirId),
        }),
    }),
  toggleBookmark: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (memoirId: number) =>
        memoirApi.toggleBookmarkMemoir(memoirId),
      onSuccess: (_, memoirId) =>
        queryClient.invalidateQueries({
          queryKey: memoirKeys.detail(memoirId),
        }),
    }),
  createComment: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: memoirApi.createMemoirComment,
      onSuccess: (_, variables) =>
        queryClient.invalidateQueries({
          queryKey: memoirKeys.comments(variables.memoirId),
        }),
    }),
};
