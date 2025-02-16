import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';

const ExploreScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text>bookinbg</Text>
    </View>
  );
};

const createStyles = (_: IColorScheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'green',
    },
  });
};

export default ExploreScreen;
