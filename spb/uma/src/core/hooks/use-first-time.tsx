import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const FIRST_TIME = 'FIRST_TIME';

export const useFirstTime = () => {
  const [firstTime, setFirstTime] = useMMKVBoolean(FIRST_TIME, storage);
  if (firstTime === undefined) {
    return [true, setFirstTime] as const;
  }
  return [firstTime, setFirstTime] as const;
};
