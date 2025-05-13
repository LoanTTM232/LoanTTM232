import { create } from 'zustand';

import clubService from '@/services/club.service';
import mediaService from '@/services/media.service';
import { ClubModel, ClubUpdateModel, MediaModel } from '@/types/model';
import { createSelectors } from '@/zustand/selectors';

interface ClubState {
  club: ClubModel;
}

interface ClubAction {
  fetchClubByOwner: (ownerId: string) => Promise<void>;
  updateClub: (club: ClubUpdateModel, clubId: string) => Promise<void>;
  addMediaToClub: (clubId: string, media: MediaModel) => Promise<string>;
  removeMediaFromClub: (mediaId: string) => Promise<void>;
//   addMediaToUnit: (unitId: string) => Promise<void>;
//   removeMediaFromUnit: (mediaId: string) => Promise<void>;
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

  addMediaToClub: async (clubId: string, media: MediaModel): Promise<string> => {
    const response = await mediaService.addMediaToClub(clubId, media);
    if (response instanceof Error) throw response;

	return response?.data?.mediaId;
  },

  removeMediaFromClub: async (mediaId: string) => {
    const response = await mediaService.removeMediaFromClub(mediaId);
    if (response instanceof Error) throw response;
  },
}));

export const useClubStore = createSelectors(useClubStoreBase);
