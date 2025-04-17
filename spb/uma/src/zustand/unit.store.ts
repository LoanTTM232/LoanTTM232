import { create } from 'zustand';

import { calculateDistance } from '@/helpers/location';
import { logDebug } from '@/helpers/logger';
import { mappingUnitModelToUnitCard } from '@/helpers/mapping';
import { round } from '@/helpers/number';
import { PopularUnitRequest, SearchUnitQuery, UnitCard } from '@/services/types';
import unitService from '@/services/unit.service';
import { UnitModel, UnitPagination } from '@/types/model';
import { createSelectors } from '@/zustand/selectors';

interface UnitState {
  popularUnits: UnitCard[];
  nearByUnits: UnitCard[];
  currentUnit: UnitModel | null;
  units: UnitModel[];
  total: number | null;
  pagination: UnitPagination | null;
}

interface UnitActions {
  fetchPopularUnits: (query: PopularUnitRequest) => Promise<void>;
  fetchNearByUnits: (query: SearchUnitQuery) => Promise<void>;
  fetchDetailUnit: (id: string) => Promise<void>;
  search: (query: SearchUnitQuery) => Promise<void>;
  reset: () => void;
}

const initialState: UnitState = {
  popularUnits: [],
  nearByUnits: [],
  currentUnit: null,
  units: [],
  total: null,
  pagination: null,
};

const useUnitStoreBase = create<UnitState & UnitActions>((set) => ({
  ...initialState,

  fetchPopularUnits: async (reqBody: PopularUnitRequest) => {
    const response = await unitService.getPopularUnits(reqBody);
    if (response instanceof Error) {
      throw response;
    }

    const units = response.data.units;
    const unitCards = units.map((unit: UnitModel) => {
      const unitCard = mappingUnitModelToUnitCard(unit);

      const distance = round(
        calculateDistance(
          { latitude: reqBody.latitude, longitude: reqBody.longitude },
          unit.address?.locationGeography
        )
      );
      unitCard.distance = `${distance} km`;
      return unitCard;
    });

    logDebug(unitCards, 'unitCards');
    set({ popularUnits: unitCards });
  },

  fetchNearByUnits: async (query: SearchUnitQuery) => {
    const { latitude, longitude } = query;
    if (!latitude || !longitude) {
      set({ nearByUnits: [] });
      return;
    }

    const response = await unitService.search(query);
    if (response instanceof Error) {
      throw response;
    }

    const units = response.data.units;
    const unitCards = units.map((unit: UnitModel) => {
      const unitCard = mappingUnitModelToUnitCard(unit);
      const distance = round(
        calculateDistance(
          { latitude, longitude },
          unit.address?.locationGeography
        )
      );
      unitCard.distance = `${distance} km`;
      return unitCard;
    });
    set({ nearByUnits: unitCards });
  },

  fetchDetailUnit: async (id: string) => {
    const response = await unitService.getDetail(id);
    if (response instanceof Error) {
      throw response;
    }

    const unit = response.data;
    set({ currentUnit: unit });
  },

  search: async (query: SearchUnitQuery) => {
    const response = await unitService.search(query);
    if (response instanceof Error) {
      throw response;
    }

    const units = response.data.units;
    const total = response.data.total;
    const pagination = response.data.pagination;
    set({ units, total, pagination });
  },

  reset: () =>
    set({ ...initialState, popularUnits: [], nearByUnits: [], units: [] }),
}));

export const useUnitStore = createSelectors(useUnitStoreBase);
