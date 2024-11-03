// import { useRouter } from 'expo-router';
import React from 'react';

import { useIsFirstTime } from '@/core/hooks';
import { View } from '@/ui';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  // const router = useRouter();
  return <View></View>;
}
