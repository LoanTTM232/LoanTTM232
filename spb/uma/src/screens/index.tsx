import React from 'react';

import Login from '@/screens/auth/Login';
import Register from '@/screens/auth/Register';
import OnBoarding from '@/screens/OnBoarding';
import TabStack from '@/screens/tabs';
import { useAuthStore } from '@/zustand';
import { NavigationContainer } from '@react-navigation/native';
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
  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Tabs" component={TabStack} />
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnBoarding}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
