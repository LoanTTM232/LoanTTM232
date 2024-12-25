import React, { useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeContext } from '@/contexts/themeContext';

function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop,
      }}
    >
      {children}
    </View>
  );
}

export default ScreenWrapper;
