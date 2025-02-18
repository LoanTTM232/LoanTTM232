import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import i18next from '@/helpers/i18n';
import { isNumber } from '@/helpers/number';

const useOTP = (length: number = 4) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [error, setError] = useState('');
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = useCallback(
    (value: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (error) {
        setError('');
      }

      if (value && index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    },
    [otp, error]
  );

  const handleKeyPress = useCallback(
    (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const validateOTP = useCallback(() => {
    if (otp.some((digit) => !isNumber(digit)) || otp.length !== length) {
      setError(i18next.t('verification.otp_required'));
      return false;
    }
    return true;
  }, [otp, length]);

  return {
    otp,
    error,
    inputs,
    handleOtpChange,
    handleKeyPress,
    validateOTP,
    setError,
  };
};

export default useOTP;
