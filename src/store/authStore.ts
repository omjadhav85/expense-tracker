import { create } from 'zustand';
import { IActions, IAuthStore } from './types';
import { USER_DATA } from '@/lib/constants';

const initialState: IAuthStore = {
  userData: localStorage.getItem(USER_DATA)
    ? JSON.parse(localStorage.getItem(USER_DATA) || '{}')
    : null,
};

export const useAuthStore = create<IAuthStore & IActions>()((set) => ({
  ...initialState,

  actions: {
    // actions
    setUserData: (data) => set(() => ({ userData: data })),
    resetStore: () => {
      set({ ...initialState, userData: null });
    },
  },
}));

export const tokenSelector = (state: IAuthStore) => state.userData?.token;
