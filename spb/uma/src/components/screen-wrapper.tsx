import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';

function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const paddingTop = top;

  const styles = createStyles(theme, paddingTop);
  console.log(paddingTop);

  return <View style={styles.container}>{children}</View>;
}

const createStyles = (theme: IColorScheme, paddingTop: number) => {
  return StyleSheet.create({
    container: {
      paddingTop,
      height: '100%',
      width: '100%',
    },
  });
};

export default ScreenWrapper;
