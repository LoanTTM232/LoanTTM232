import React, { ReactNode, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { hp } from '@/helpers/dimensions';

interface ITabViewProps {
  routes: Array<{
    key: string;
    component: ReactNode;
    title: string;
  }>;
  theme: IColorScheme;
}

const AuthTabView: React.FC<ITabViewProps> = ({ routes, theme }) => {
  const styles = createStyles(theme);
  const viewRef = useRef<PagerView>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSwitch = (index: number) => {
    viewRef.current?.setPage(index);
    setActiveTab(index);
  };

  return (
    <View style={styles.container} accessibilityRole="tabbar">
      <View style={styles.tabSwitch}>
        {routes.map((route, i) => (
          <Pressable
            key={route.key}
            style={[styles.tab, i === activeTab && styles.activeTab]}
            onPress={() => handleTabSwitch(i)}
          >
            <Text style={styles.tabText}>{route.title}</Text>
          </Pressable>
        ))}
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        ref={viewRef}
      >
        {routes.map((route) => (
          <View key={route.key} style={styles.page} collapsable={false}>
            {route.component}
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabSwitch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.backgroundDark,
      gap: hp(1),
      marginTop: hp(4),
      marginHorizontal: hp(2),
      borderRadius: 6,
    },
    tab: {
      paddingVertical: 5,
      borderRadius: 6,
      flex: 1,
      margin: 3,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: theme.backgroundLight,
    },
    tabText: {
      ...fontFamily.ROBOTO_THIN,
      fontSize: fontSize.md,
    },
    pagerView: {
      width: '100%',
      height: '100%',
    },
    page: {
      flex: 1,
    },
  });

export default AuthTabView;
