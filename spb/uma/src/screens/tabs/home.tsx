import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';

const HomeScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    safeView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundDark,
    },
  });
};

export default HomeScreen;
