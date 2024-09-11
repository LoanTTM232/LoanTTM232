import LoginScreen from '@/screens/auth/login.screen'
import RegisterScreen from '@/screens/auth/register.screen'
import OnboardingScreen from '@/screens/onboarding/onboarding.screen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

// Define the types for the navigation stack
export type RootStackParamList = {
  Onboarding: undefined
  Login: undefined
  Register: undefined
}

// Create the stack navigator with types
const Stack = createStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
