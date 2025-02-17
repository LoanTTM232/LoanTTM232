import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp } from '@/helpers/dimensions';
import BookingScreen from '@/screens/tabs/booking.screen';
import ExploreScreen from '@/screens/tabs/explore.screen';
import HomeScreen from '@/screens/tabs/home.screen';
import NotifyScreen from '@/screens/tabs/notify.screen';
import ProfileScreen from '@/screens/tabs/profile.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Booking: undefined;
  Notify: undefined;
  Profile: undefined;
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

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Explore') {
      iconName = focused ? 'compass' : 'compass-outline';
    } else if (route.name === 'Booking') {
      iconName = focused ? 'time' : 'time-outline';
    } else if (route.name === 'Notify') {
      iconName = focused ? 'notifications' : 'notifications-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    }
    return <Ionicons name={iconName} size={22} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: theme.primary,
        tabBarIcon: ({ focused, color }) =>
          renderTabBarIcon(route, focused, color),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Notify" component={NotifyScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    tabBar: {
      height: hp(7.5),
      backgroundColor: theme.backgroundSoft,
    },
    tabBarLabelStyle: {
      fontFamily: Font.family.medium,
      fontSize: hp(1.5),
    },
  });
};

export default TabStack;
