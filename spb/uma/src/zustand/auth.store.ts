import { create } from 'zustand';

import { getData } from '@/helpers/storage';
import authService, {
  LoginRequest,
  RegisterRequest,
} from '@/services/auth.service';
import { createSelectors } from '@/zustand/selectors';

interface AuthState {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  fullName: string;

  checkIsLoggedIn: () => void;
  login: (data: LoginRequest) => void;
  logout: () => void;
  register: (data: RegisterRequest) => void;
  googleCallback: (data: { code: string }) => void;
}

const useAuthStoreBase = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: '',
  email: '',
  fullName: '',

  checkIsLoggedIn: async () => {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      set(() => ({ isLoggedIn: true }));
    }
  },

  login: async (data: LoginRequest) => {
    const res = await authService.login(data);
    if (res instanceof Error) {
      throw res;
    }

    set(() => ({
      isLoggedIn: true,
      userId: res.data.user.user_id,
      email: res.data.user.email,
      fullName: res.data.user.full_name,
    }));
  },

  logout: async () => {
    await authService.logout();

    set(() => ({
      isLoggedIn: false,
      accessToken: '',
      userId: '',
      email: '',
      fullName: '',
    }));
  },

  register: async (data: RegisterRequest) => {
    const res = await authService.register(data);
    if (res instanceof Error) {
      throw res;
    }
  },

  googleCallback: async (data: { code: string }) => {
    console.log('call googleCallback');
    const res = await authService.googleCallback(data);

    if (res instanceof Error) {
      throw res;
    }

    set(() => ({
      isLoggedIn: true,
      userId: res.data.user.user_id,
      email: res.data.user.email,
      fullName: res.data.user.full_name,
    }));
  },
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
