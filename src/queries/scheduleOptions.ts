import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import * as scheduleApi from '@/apis/scheduleApi';

import { scheduleKeys } from './queryKeys';

export const scheduleQueries = {
  all: () =>
    queryOptions({
      queryKey: scheduleKeys.lists(),
      queryFn: scheduleApi.getAllSchedules,
    }),
  detail: (scheduleId: string) =>
    queryOptions({
      queryKey: scheduleKeys.detail(scheduleId),
      queryFn: () => scheduleApi.getScheduleDetails({ scheduleId }),
    }),
};

export const scheduleMutations = {
  create: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: scheduleApi.createSchedule,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() }),
    }),
  update: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: scheduleApi.updateSchedule,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: scheduleKeys.detail(variables.scheduleId),
        });
      },
    }),
  delete: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: scheduleApi.deleteSchedule,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() }),
    }),
};
