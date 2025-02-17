import React from 'react';

import useBackHandler from '@/hooks/back.hook';
import Login from '@/screens/auth/login.screen';
import Register from '@/screens/auth/register.screen';
import OnBoarding from '@/screens/onboarding.screen';
import TabStack from '@/screens/tabs';
import { useAuthStore } from '@/zustand';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export type ParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
};

function RootStack(): React.JSX.Element {
  const isLoggedIn = useAuthStore.use.isLoggedIn();

  useBackHandler();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Tabs" component={TabStack} />
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnBoarding}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 500,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default RootStack;
