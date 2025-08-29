'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as userApi from '@/apis/userApi';

type State = {
  username: string | null;
  profileImageUrl: string | null;
  loaded: boolean;
};

type Actions = {
  setUser: (u: { username: string; profileImageUrl: string | null }) => void;
  clear: () => void;
  fetchMyProfile: () => Promise<void>;
};

export const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      username: null,
      profileImageUrl: null,
      loaded: false,

      setUser: u => set({ ...u, loaded: true }),
      clear: () =>
        set({ username: null, profileImageUrl: null, loaded: false }),

      fetchMyProfile: async () => {
        try {
          const r = await userApi.getProfile();
          const { username, profileImageUrl } = r.data;
          set({ username, profileImageUrl, loaded: true });
        } catch {
          set({ loaded: true, username: null, profileImageUrl: null });
        }
      },
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => localStorage),
      partialize: s => ({
        username: s.username,
        profileImageUrl: s.profileImageUrl,
      }),
    },
  ),
);
