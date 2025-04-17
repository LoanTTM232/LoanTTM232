import { create } from 'zustand';

import { createSelectors } from '@/zustand/selectors';

interface LoadingState {
  isLoading: boolean;
}

interface LoadingActions {
  setLoading: (isLoading: boolean) => void;
}

const useLoadingStoreBase = create<LoadingState & LoadingActions>((set) => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

export const useLoadingStore = createSelectors(useLoadingStoreBase);
