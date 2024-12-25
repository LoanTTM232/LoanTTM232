import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/contexts/themeContext';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded] = useFonts({
    'Roboto-Italic': require('../../assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Raleway-Regular': require('../../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Medium': require('../../assets/fonts/Raleway-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
