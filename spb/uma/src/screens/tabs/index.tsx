import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp } from '@/helpers/dimensions';
import BookingScreen from '@/screens/tabs/booking';
import ExploreScreen from '@/screens/tabs/explore';
import HomeScreen from '@/screens/tabs/home';
import NotifyScreen from '@/screens/tabs/notify';
import ProfileScreen from '@/screens/tabs/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Booking: undefined;
  Notify: undefined;
  Profile: undefined;
};

export const TabScreens: Record<string, keyof TabParamList> = {
  Home: 'Home',
  Explore: 'Explore',
  Booking: 'Booking',
  Notify: 'Notify',
  Profile: 'Profile',
};

const TabStack: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const renderTabBarIcon = (
    route: { name: string },
    focused: boolean,
    color: string
  ) => {
    let iconName = '';

    if (route.name === TabScreens.Home) {
      iconName = 'home-outline';
    } else if (route.name === TabScreens.Explore) {
      iconName = 'compass-outline';
    } else if (route.name === TabScreens.Booking) {
      iconName = 'time-outline';
    } else if (route.name === TabScreens.Notify) {
      iconName = 'notifications-outline';
    } else if (route.name === TabScreens.Profile) {
      iconName = 'person-outline';
    }
    return <Ionicons name={iconName} size={24} color={color} />;
  };

  return (
    <Tab.Navigator
      initialRouteName={TabScreens.Home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveTintColor: theme.primary,
        tabBarIcon: ({ focused, color }) =>
          renderTabBarIcon(route, focused, color),
        animation: 'fade',
      })}
      backBehavior="history"
    >
      <Tab.Screen name={TabScreens.Home} component={HomeScreen} />
      <Tab.Screen name={TabScreens.Explore} component={ExploreScreen} />
      <Tab.Screen name={TabScreens.Booking} component={BookingScreen} />
      <Tab.Screen name={TabScreens.Notify} component={NotifyScreen} />
      <Tab.Screen name={TabScreens.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    tabBar: {
      height: hp(8),
      backgroundColor: theme.backgroundLight,
    },
    tabBarLabelStyle: {
      ...fontFamily.ROBOTO_MEDIUM,
      fontSize: fontSize.xs,
      textAlign: 'center',
    },
    tabBarItemStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};

export default TabStack;
