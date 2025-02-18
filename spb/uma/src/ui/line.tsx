import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily, fontSize, IColorScheme } from '@/constants';

interface ILineProps {
  isHorizontal?: boolean;
  title?: string;
  theme: IColorScheme;
}

const Line: React.FC<ILineProps> = ({ title, theme }) => {
  const styles = createStyles(theme);
  return (
    <View style={styles.line}>
      {!!title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    line: {
      height: 1,
      width: '95%',
      margin: 'auto',
      backgroundColor: theme.borderLight,
    },
    title: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.sm,
      color: theme.textLight,
      backgroundColor: theme.backgroundLight,
      position: 'absolute',
      display: 'flex',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      paddingHorizontal: '2%',
    },
  });

export default Line;
