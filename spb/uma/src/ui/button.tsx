import React, { useContext } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp } from '@/helpers/dimensions';

interface ButtonProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyles?: TextStyle;
  disable?: boolean;
  shadow?: boolean;
  onPress?: (e: any) => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

function Button({
  title,
  buttonStyle,
  textStyles,
  disable = false,
  shadow = true,
  onPress,
  before,
  after,
}: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  const defaultStyles = createStyle(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        defaultStyles.button,
        buttonStyle,
        shadow && defaultStyles.shadow,
        pressed && defaultStyles.pressed,
      ]}
      onPress={onPress}
      disabled={disable}
    >
      {before}
      {title && <Text style={[defaultStyles.text, textStyles]}>{title}</Text>}
      {after}
    </Pressable>
  );
}

const createStyle = function (theme: IColorScheme) {
  return StyleSheet.create({
    button: {
      backgroundColor: theme.primary,
      height: hp(6.6),
      alignItems: 'center',
      borderRadius: Radius.xs,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
    text: {
      color: theme.secondary,
    },
    shadow: {
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });
};

export default Button;
