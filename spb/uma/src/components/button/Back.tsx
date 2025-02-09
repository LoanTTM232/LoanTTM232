import React, { useContext } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import Icon from '@/ui/icon';
import { useNavigation } from '@react-navigation/native';

export type BackButtonProps = {
  styles?: ViewStyle;
  onPress?: () => void;
};

function BackButton(props: BackButtonProps) {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const defaultOnPress = () => {
    navigation.goBack();
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
