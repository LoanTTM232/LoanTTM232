import Geolocation from 'react-native-geolocation-service';
import { create } from 'zustand';

import { GEOGRAPHY_RADIUS } from '@/constants';
import { getData, storeData } from '@/helpers/storage';
import { createSelectors } from '@/zustand/selectors';

interface LocationState {
  latitude: number;
  longitude: number;
  address: string | null;
  city: string | null;
  radius: number;
}

interface LocationActions {
  setLocation: (lat: number, lng: number) => void;
  setAddress: (addr: string, city: string) => Promise<void>;
  loadPreviousAddress: () => Promise<void>;
  getCurrentLocation: () => Promise<{ longitude: number; latitude: number }>;
  reset: () => void;
}

const initialState: LocationState = {
  latitude: 0,
  longitude: 0,
  address: null,
  city: null,
  radius: GEOGRAPHY_RADIUS,
};

const useLocationStoreBase = create<LocationState & LocationActions>(
  (set, get) => ({
    ...initialState,

    setLocation: (lat, lng) => {
      set({ latitude: lat, longitude: lng });
    },
    setAddress: async (addr, city) => {
      await storeData(
        'address',
        JSON.stringify({
          address: addr,
          city: city,
        })
      );

      set({ address: addr, city: city });
    },
    loadPreviousAddress: async () => {
      const data = await getData('address');
      if (data) {
        const { address, city } = JSON.parse(data);
        set({ address, city });
      }
    },
    getCurrentLocation: (): Promise<{
      longitude: number;
      latitude: number;
    }> => {
      let latitude = get().latitude;
      let longitude = get().longitude;

      if (latitude && longitude) {
        return Promise.resolve({ latitude, longitude });
      }

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            set({ latitude, longitude });
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    },
    reset: () => set({ ...initialState }),
  })
);

export const useLocationStore = createSelectors(useLocationStoreBase);
