import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import BookingScreen from '@/screens/tabs/Booking';
import ExploreScreen from '@/screens/tabs/Explore';
import HomeScreen from '@/screens/tabs/Home';
import NotifyScreen from '@/screens/tabs/Notify';
import ProfileScreen from '@/screens/tabs/Profile';
import CircleDot from '@/ui/icon/circleDot';
import Explore from '@/ui/icon/explore';
import Home from '@/ui/icon/home';
import Notification from '@/ui/icon/notification';
import Profile from '@/ui/icon/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabStack: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: theme.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: Home }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarIcon: Explore }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{ tabBarIcon: CircleDot }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{ tabBarIcon: Notification }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: Profile }}
      />
    </Tab.Navigator>
  );
};

const createStyles = (_: IColorScheme) => {
  return StyleSheet.create({
    tabBar: {
      height: hp(7),
      width: '100%',
    },
    tabBarLabelStyle: {
      fontFamily: 'Poppins-Medium',
      fontSize: hp(1.5),
    },
  });
};

export default TabStack;
