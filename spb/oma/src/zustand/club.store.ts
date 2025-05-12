import { create } from 'zustand';

import clubService from '@/services/club.service';
import { ClubModel, ClubUpdateModel } from '@/types/model';
import { createSelectors } from '@/zustand/selectors';

interface ClubState {
  club: ClubModel;
}

interface ClubAction {
  fetchClubByOwner: (ownerId: string) => Promise<void>;
  updateClub: (club: ClubUpdateModel, clubId: string) => Promise<void>;
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

  updateClub: async (club: ClubUpdateModel, clubId: string) => {
    const response = await clubService.updateClub(club, clubId);
    if (response instanceof Error) throw response;
  },
}));

export const useClubStore = createSelectors(useClubStoreBase);
