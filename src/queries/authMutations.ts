import { mutationOptions } from '@tanstack/react-query';

import * as authApi from '@/apis/authApi';

export const authMutations = {
  refreshToken: mutationOptions({
    mutationFn: authApi.refreshToken,
    // onSuccess, onError 등 필요에 따라 추가
  }),
  logout: mutationOptions({
    mutationFn: authApi.logout,
    // onSuccess, onError 등 필요에 따라 추가
  }),
};
