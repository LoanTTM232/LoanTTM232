import React from 'react';

import useFirstLaunch from '@/hooks/useFirstLaunch';
import useHardwareBack from '@/hooks/useHardwareBack';
import AuthScreen from '@/screens/auth';
import OnBoardingScreen from '@/screens/onboarding';
import TabStack from '@/screens/tabs';
import VerificationScreen from '@/screens/verification';
import { useAuthStore } from '@/zustand';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Verification: undefined;
  Tabs: undefined;
};

export const RootScreens: Record<string, keyof ParamList> = {
  Onboarding: 'Onboarding',
  Auth: 'Auth',
  Verification: 'Verification',
  Tabs: 'Tabs',
};

const Stack = createNativeStackNavigator<ParamList>();

const RootStack: React.FC = () => {
  const isLoggedIn = useAuthStore.use.isLoggedIn();
  const isFirstLaunch = useFirstLaunch();
  useHardwareBack();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isLoggedIn
          ? RootScreens.Tabs
          : isFirstLaunch
            ? RootScreens.Onboarding
            : RootScreens.Auth
      }
    >
      {!isLoggedIn && (
        <>
          <Stack.Screen
            name={RootScreens.Onboarding}
            component={OnBoardingScreen}
          />
          <Stack.Screen name={RootScreens.Auth} component={AuthScreen} />
          <Stack.Screen
            name={RootScreens.Verification}
            component={VerificationScreen}
          />
        </>
      )}
      <Stack.Screen name={RootScreens.Tabs} component={TabStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
