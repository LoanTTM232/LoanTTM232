import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OTPInput from '@/components/field/OTPInput';
import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { convertSecondsToMMSS } from '@/helpers/datetime';
import { hp } from '@/helpers/dimensions';
import i18next from '@/helpers/i18n';
import { logDebug, logError } from '@/helpers/logger';
import useOTP from '@/hooks/useOTP';
import useResendTimer from '@/hooks/useResendTimer';
import { ParamList } from '@/screens';
import Button from '@/ui/button';
import { useAuthStore } from '@/zustand';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const VerificationScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();
  const verifyEmail = useAuthStore.use.verifyEmail();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const {
    otp,
    error,
    inputs,
    handleOtpChange,
    handleKeyPress,
    validateOTP,
    setError,
  } = useOTP(4);

  const { timer, resendCount, handleResend, canResend } = useResendTimer();

  const handleSubmit = async () => {
    if (!validateOTP()) return;

    try {
      const otpNumber = Number(otp.join(''));
      logDebug(`OTP submitted: ${otpNumber}`);

      await verifyEmail({ token: otpNumber });
      navigation.navigate('Tabs');
    } catch (err) {
      logError(err as Error);
      setError(i18next.t('verification.otp_invalid'));
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18next.t('verification.title')}</Text>
        <Text style={styles.description}>
          {i18next.t('verification.description')}
        </Text>
        <Text style={styles.inputTitle}>{i18next.t('verification.otp')}</Text>

        <OTPInput
          ref={inputs}
          otp={otp}
          onOtpChange={handleOtpChange}
          onKeyPress={handleKeyPress}
          theme={theme}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title={i18next.t('verification.submit')}
          onPress={handleSubmit}
          buttonStyle={styles.button}
          textStyles={styles.buttonText}
        />

        <View style={styles.resendContainer}>
          <Text
            style={[styles.resendText, !canResend && styles.resendTextDisabled]}
            onPress={handleResend}
          >
            {i18next.t('verification.resend')}
          </Text>
          <Text style={styles.resendTimer}>{convertSecondsToMMSS(timer)}</Text>
        </View>

        {resendCount >= 3 && (
          <Text style={styles.error}>
            {i18next.t('verification.resend_limit')}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    safeView: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.backgroundLight,
    },
    title: {
      ...fontFamily.ROBOTO_BOLD,
      fontSize: fontSize.xxl,
      paddingTop: hp(10),
      paddingBottom: hp(1),
      textAlign: 'center',
      color: theme.textDark,
    },
    description: {
      color: theme.textDark,
      width: '60%',
      textAlign: 'center',
      marginHorizontal: 'auto',
    },
    inputTitle: {
      marginTop: hp(10),
      ...fontFamily.ROBOTO_MEDIUM,
      fontSize: fontSize.xl,
      color: theme.textDark,
    },
    error: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
    },
    resendContainer: {
      marginTop: hp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    resendText: {
      ...fontFamily.ROBOTO_MEDIUM,
      fontSize: fontSize.sm,
      color: theme.textLight,
    },
    resendTimer: {
      ...fontFamily.ROBOTO_MEDIUM,
      fontSize: fontSize.md,
      color: theme.primary,
    },
    resendTextDisabled: {
      opacity: 0.5,
    },
  });

export default VerificationScreen;
