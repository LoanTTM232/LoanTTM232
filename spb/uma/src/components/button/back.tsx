import React, { useContext } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import ArrowLeft from '@/ui/icon/arrow-left';
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
      <ArrowLeft color={theme.icon} size={20} />
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
