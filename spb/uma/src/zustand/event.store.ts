import { create } from 'zustand';

import { createSelectors } from '@/zustand/selectors';

interface EventState {
  focus: boolean;

  setFocus: (focused: boolean) => void;
}

const useEventStoreBase = create<EventState>((set) => ({
  focus: false,

  setFocus: (focused: boolean) => {
    set(() => ({ focus: focused }));
  },
}));

export const useEventStore = createSelectors(useEventStoreBase);
