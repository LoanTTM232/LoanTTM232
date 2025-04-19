import { create } from 'zustand';

import { calculateDistance } from '@/helpers/location';
import { mappingUnitModelToUnitCard } from '@/helpers/mapping';
import { round } from '@/helpers/number';
import { PopularUnitRequest, SearchUnitQuery, UnitCard } from '@/services/types';
import unitService from '@/services/unit.service';
import { GeographyModel, UnitModel, UnitPagination } from '@/types/model';
import { createSelectors } from '@/zustand/selectors';

export enum UnitRenderTypes {
  POPULAR = 'popular',
  NEARBY = 'nearby',
  SEARCH = 'search',
}

interface UnitState {
  popularUnits: UnitCard[];
  nearByUnits: UnitCard[];
  searchUnits: UnitCard[];
  currentUnit: UnitModel | null;
  total: number | null;
  pagination: UnitPagination | null;
}

interface UnitActions {
  fetchPopularUnits: (query: PopularUnitRequest) => Promise<void>;
  fetchNearByUnits: (query: SearchUnitQuery) => Promise<void>;
  fetchDetailUnit: (id: string) => Promise<void>;
  search: (
    query: SearchUnitQuery,
    currentLocation: GeographyModel
  ) => Promise<void>;
  reset: () => void;
}

const initialState: UnitState = {
  popularUnits: [],
  nearByUnits: [],
  currentUnit: null,
  searchUnits: [],
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
    const popularUnits = units.map((unit: UnitModel) => {
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

    set({ popularUnits });
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
    const nearByUnits = units.map((unit: UnitModel) => {
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
    set({ nearByUnits });
  },

  fetchDetailUnit: async (id: string) => {
    const response = await unitService.getDetail(id);
    if (response instanceof Error) {
      throw response;
    }

    const unit = response.data;
    set({ currentUnit: unit });
  },

  search: async (query: SearchUnitQuery, currentLocation: GeographyModel) => {
    const response = await unitService.search(query);
    if (response instanceof Error) {
      throw response;
    }

    let latitude = 0,
      longitude = 0;
    if (query.latitude && query.longitude) {
      latitude = query.latitude;
      longitude = query.longitude;
    } else {
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude;
    }

    const units = response.data.units;
    const total = response.data.total;
    const pagination = response.data.pagination;
    const searchUnits = units.map((unit: UnitModel) => {
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

    set({ searchUnits, total, pagination });
  },

  reset: () =>
    set({
      ...initialState,
      popularUnits: [],
      nearByUnits: [],
      searchUnits: [],
    }),
}));

export const useUnitStore = createSelectors(useUnitStoreBase);
