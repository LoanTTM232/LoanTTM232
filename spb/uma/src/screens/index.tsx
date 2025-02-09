import React from 'react';

import Login from '@/screens/auth/login';
import Register from '@/screens/auth/register';
import OnBoarding from '@/screens/onboarding';
import TabStack from '@/screens/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
};

function RootStack(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnBoarding}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen name="Tabs" component={TabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
