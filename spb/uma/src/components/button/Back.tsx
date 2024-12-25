import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import Icon from '@/ui/icon';

interface IBackButtonProps {
  styles?: ViewStyle;
  onPress?: () => void;
}

function BackButton(props: IBackButtonProps) {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const router = useRouter();
  const defaultOnPress = () => {
    router.back();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={props.onPress || defaultOnPress}
    >
      <Icon icon="arrowLeft" color={theme.icon} />
    </Pressable>
  );
}

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22,
    },
  });
};

export default BackButton;
