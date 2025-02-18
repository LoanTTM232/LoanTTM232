import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp, wp } from '@/helpers/dimensions';
import EyeIcon from '@/ui/icon/eye';
import EyeOffIcon from '@/ui/icon/eye-off';

interface IInputProps {
  type: 'text' | 'password';
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onBlur?: (e: any) => void;
  error: boolean;
  autoFocus?: boolean;
}

const Input: React.FC<IInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChangeText,
  error,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles(theme, error);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.borderDark}
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
  );
};

const createStyles = (theme: IColorScheme, hasError: boolean) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderCurve: 'continuous',
      borderColor: hasError ? theme.error : theme.borderLight,
      borderBottomWidth: 1,
    },
    input: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      paddingHorizontal: wp(4),
      color: theme.textDark,
      height: hp(5),
      flex: 1,
    },
    rightIcon: {
      width: hp(5),
      height: hp(5),
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },
  });
};

export default Input;
