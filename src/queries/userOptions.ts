'use client';

import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import * as userApi from '@/apis/userApi';

import { userKeys } from './queryKeys';

export const userQueries = {
  history: () =>
    queryOptions({
      queryKey: userKeys.history(),
      queryFn: userApi.getUserSearchHistory,
    }),
  getProfile: () =>
    queryOptions({
      queryKey: userKeys.profile(),
      queryFn: userApi.getProfile,
    }),
};

export const userMutations = {
  deleteHistory: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (id: number) => userApi.deleteUserSearchHistory(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: userKeys.history() }),
    }),
  deleteAllHistory: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: userApi.deleteAllUserSearchHistory,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: userKeys.history() }),
    }),
  updateProfile: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: userKeys.profile(),
      mutationFn: userApi.updateProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      },
    }),
  logout: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: userKeys.logout(),
      mutationFn: userApi.logout,
      onSuccess: () => {
        queryClient.clear();
      },
    }),
  withdraw: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: userKeys.withdraw(),
      mutationFn: userApi.deleteAccount,
      onSuccess: () => {
        queryClient.clear();
      },
    }),
};
