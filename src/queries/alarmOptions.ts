import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import * as alarmApi from '@/apis/alarmApi';

import { alarmKeys } from './queryKeys';

export const alarmQueries = {
  list: () =>
    queryOptions({
      queryKey: alarmKeys.lists(),
      queryFn: alarmApi.getAlarmList,
    }),
};

export const alarmMutations = {
  create: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: alarmApi.createAlarm,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: alarmKeys.lists() }),
    }),
};
