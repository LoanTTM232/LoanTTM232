import React, { useContext, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
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
  buttonStyle?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
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

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}
    >
      <Pressable
        style={({ pressed }) => [
          defaultStyles.button,
          buttonStyle,
          shadow && defaultStyles.shadow,
          pressed && defaultStyles.pressed,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disable}
        accessibilityRole="button"
      >
        {before ?? null}
        {title && <Text style={[defaultStyles.text, textStyles]}>{title}</Text>}
        {after ?? null}
      </Pressable>
    </Animated.View>
  );
}

const createStyle = (theme: IColorScheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.primary,
      height: hp(6),
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
    },
  });

export default Button;
