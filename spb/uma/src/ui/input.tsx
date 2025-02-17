import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp, wp } from '@/helpers/dimensions';
import EyeIcon from '@/ui/icon/eye';
import EyeOffIcon from '@/ui/icon/eye-off';

interface IInputProps {
  title: string;
  type: 'text' | 'password';
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onBlur?: (e: any) => void;
}

const Input: React.FC<IInputProps> = ({
  title,
  type = 'text',
  placeholder,
  value,
  onChangeText,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.textLight}
          onChangeText={onChangeText}
          secureTextEntry={type === 'password' && !showPassword}
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon color={theme.icon} size={20} />
            ) : (
              <EyeOffIcon color={theme.icon} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    container: {
      gap: 5,
    },
    title: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      color: theme.textLight,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: Radius.xs,
      backgroundColor: theme.secondary,
      alignItems: 'center',
    },
    input: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      borderCurve: 'continuous',
      paddingHorizontal: wp(4),
      color: theme.textDark,
      height: hp(6.6),
      flex: 1,
    },
    rightIcon: {
      width: hp(6.6),
      height: hp(6.6),
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },
  });
};

export default Input;
