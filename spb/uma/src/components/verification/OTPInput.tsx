import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { hp } from '@/helpers/dimensions';

interface IOTPInputProps {
  otp: string[];
  onOtpChange: (value: string, index: number) => void;
  onKeyPress: (e: any, index: number) => void;
  theme: IColorScheme;
}

const OTPInput = forwardRef<(TextInput | null)[], IOTPInputProps>(
  ({ otp, onOtpChange, onKeyPress, theme }, ref) => {
    const inputs = ref as React.MutableRefObject<(TextInput | null)[]>;
    const styles = createOTPStyles(theme);

    return (
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            autoFocus={index === 0}
            onChangeText={(value) => onOtpChange(value, index)}
            onKeyPress={(e) => onKeyPress(e, index)}
            ref={(inputRef) => (inputs.current[index] = inputRef)}
          />
        ))}
      </View>
    );
  }
);

const createOTPStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: hp(2),
      marginBottom: hp(4),
    },
    otpBox: {
      width: 70,
      height: 50,
      textAlign: 'center',
      fontSize: fontSize.xl,
      ...fontFamily.ROBOTO_BOLD,
      color: theme.textLight,
      backgroundColor: theme.secondary,
      borderRadius: 8,
    },
  });
};

export default OTPInput;
