import React, { useContext } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Font, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';

interface ButtonProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyles?: TextStyle;
  children?: React.ReactNode;
  disable?: boolean;
  shadow?: boolean;
  onPress?: (e: any) => void;
}

function Button({
  title,
  buttonStyle,
  textStyles,
  children,
  disable = false,
  shadow = true,
  onPress,
}: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  const defaultStyles = createStyle(theme);

  return (
    <Pressable
      style={[
        defaultStyles.button,
        buttonStyle,
        shadow && defaultStyles.shadow,
      ]}
      onPress={onPress}
      disabled={disable}
    >
      {title && <Text style={[defaultStyles.text, textStyles]}>{title}</Text>}
      {children}
    </Pressable>
  );
}

const createStyle = function (color: IColorScheme) {
  return StyleSheet.create({
    button: {
      backgroundColor: color.primary,
      height: hp(6.6),
      justifyContent: 'center',
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: 8,
    },
    text: {
      color: color.secondary,
      fontSize: hp(2.2),
      fontFamily: Font.family.medium,
    },
    shadow: {
      shadowColor: color.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  });
};

export default Button;
