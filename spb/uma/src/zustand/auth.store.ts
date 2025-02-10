import { create } from 'zustand';

import { getData } from '@/helpers/storage';
import { createSelectors } from '@/zustand/selectors';

interface AuthState {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  fullName: string;

  checkIsLoggedIn: () => void;
  login: (
    accessToken: string,
    userId: AuthState['userId'],
    email: AuthState['email'],
    fullName: AuthState['fullName']
  ) => void;
  logout: () => void;
  register: (
    accessToken: string,
    userId: AuthState['userId'],
    email: AuthState['email'],
    fullName: AuthState['fullName']
  ) => void;
}

const useAuthStoreBase = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: '',
  email: '',
  fullName: '',

  checkIsLoggedIn: async () => {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      set(() => ({ isLoggedIn: true, accessToken }));
    }
  },

  login: async (
    accessToken: string,
    userId: AuthState['userId'],
    email: AuthState['email'],
    fullName: AuthState['fullName']
  ) => {
    set(() => ({
      isLoggedIn: true,
      accessToken,
      userId,
      email,
      fullName,
    }));
  },

  logout: async () => {
    set(() => ({
      isLoggedIn: false,
      accessToken: '',
      userId: '',
      email: '',
      fullName: '',
    }));
  },

  register: async (
    accessToken: string,
    userId: AuthState['userId'],
    email: AuthState['email'],
    fullName: AuthState['fullName']
  ) => {
    set(() => ({
      isLoggedIn: true,
      accessToken,
      userId,
      email,
      fullName,
    }));
  },
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
