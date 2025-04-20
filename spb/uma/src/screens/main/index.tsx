import React, { FC } from 'react';

import SearchScreen from '@/screens/main/search';
import SearchResultScreen from '@/screens/main/search_result';
import TabScreens from '@/screens/main/tab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Tabs: undefined;
  Search: undefined;
  SearchResult: undefined;
};

export const MainScreens: Record<string, keyof MainStackParamList> = {
  Tabs: 'Tabs',
  Search: 'Search',
  SearchResult: 'SearchResult',
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainScreens.Tabs}
      screenOptions={{ animation: 'slide_from_right', headerShown: false }}
    >
      <Stack.Screen name={MainScreens.Tabs} component={TabScreens} />
      <Stack.Screen
        name={MainScreens.Search}
        component={SearchScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={MainScreens.SearchResult}
        component={SearchResultScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
