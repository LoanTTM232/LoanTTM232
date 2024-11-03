import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

enum AuthStatus {
  Idle = 'idle',
  SignOut = 'signOut',
  SignIn = 'signIn',
}

interface AuthState {
  token: TokenType | null;
  status: AuthStatus;
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: AuthStatus.Idle,
  token: null,
  signIn: (token) => {
    setToken(token);
    set({ status: AuthStatus.SignIn, token });
  },
  signOut: () => {
    removeToken();
    set({ status: AuthStatus.SignOut, token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // sign out user
      get().signOut();
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
