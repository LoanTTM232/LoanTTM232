import { Redirect, SplashScreen } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';

import { useAuth, useFirstTime } from '@/core';

export default function TabLayout() {
  const status = useAuth.use.status();
  const isFirstTime = useFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <Text>TabLayout</Text>
    </View>
  );
}
