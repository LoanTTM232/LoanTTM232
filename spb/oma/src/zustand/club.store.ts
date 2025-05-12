import { create } from 'zustand';

import clubService from '@/services/club.service';
import { ClubModel } from '@/types/model';
import { createSelectors } from '@/zustand/selectors';

interface ClubState {
  club: ClubModel;
}

interface ClubAction {
  fetchClubByOwner: (ownerId: string) => Promise<void>;
  //   updateClub: (club: ClubModel) => Promise<void>;
  //   createUnit: (unit: UnitModel) => Promise<void>;
  //   updateUnit: (unit: UnitModel) => Promise<void>;
  //   deleteUnit: (unitId: string) => Promise<void>;
}

const initialState: ClubState = {
  club: {} as ClubModel,
};

const useClubStoreBase = create<ClubState & ClubAction>((set) => ({
  ...initialState,

  fetchClubByOwner: async (ownerId: string) => {
    const response = await clubService.getClubByOwner(ownerId);
    if (response instanceof Error) throw response;

    set({ club: response.data });
  },
}));

export const useClubStore = createSelectors(useClubStoreBase);
