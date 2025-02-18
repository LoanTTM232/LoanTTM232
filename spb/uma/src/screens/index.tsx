import React from 'react';

import useBackHandler from '@/hooks/useBack';
import useFirstLaunch from '@/hooks/useFirstLaunch';
import AuthScreen from '@/screens/auth';
import OnBoardingScreen from '@/screens/onboarding';
import TabStack from '@/screens/tabs';
import VerificationScreen from '@/screens/verification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Verification: undefined;
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const RootStack: React.FC = () => {
  const isFirstLaunch = useFirstLaunch();
  useBackHandler();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isFirstLaunch ? 'Onboarding' : 'Auth'}
    >
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Tabs" component={TabStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
