import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '@/components/button/back';
import GoogleSignIn from '@/components/button/google-signin';
import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp } from '@/helpers/dimensions';
import i18next from '@/helpers/i18n';
import { logDebug, logError } from '@/helpers/logger';
import { toastError, toastSuccess } from '@/helpers/toast';
import { loginValidation } from '@/helpers/validate';
import { ParamList } from '@/screens';
import Button from '@/ui/button';
import Input from '@/ui/input';
import Link from '@/ui/link';
import { useAuthStore } from '@/zustand';
import { WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();
  const googleCallback = useAuthStore.use.googleCallback();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      scopes: ['email', 'profile'],
    });
  }, [navigation]);

  const onGoogleButtonHandler = async () => {
    try {
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken as string;
      await googleCallback({ code: idToken });

      navigation.navigate('Tabs');
      toastSuccess(i18next.t('notification.login_success'));
    } catch (error) {
      logError(error as Error);
      toastError(i18next.t('notification.login_failed'));
    }
  };

  const onForgotPasswordHandler = () => {
    logDebug('Forgot password');
  };

  const onRegisterHandler = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainContent}>
            <BackButton />
            <Text style={styles.title}>Welcome back</Text>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidation}
              onSubmit={() => {
                console.log('alo');
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.form}>
                  <View style={styles.controlGroup}>
                    <View>
                      <Input
                        title={i18next.t('login.email')}
                        type="text"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="xyz@gmail.com"
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorMsg}>{errors.email}</Text>
                      )}
                    </View>
                    <View>
                      <Input
                        title={i18next.t('login.password')}
                        type="password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="••••••••"
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.errorMsg}>{errors.password}</Text>
                      )}
                    </View>
                  </View>
                  <Link
                    style={styles.forgotPassword}
                    title={i18next.t('login.forgot')}
                    onPress={onForgotPasswordHandler}
                  />
                  <View style={styles.buttonGroup}>
                    <Button
                      buttonStyle={styles.button}
                      textStyles={styles.buttonText}
                      title={i18next.t('login.submit')}
                      onPress={handleSubmit}
                    />
                    <GoogleSignIn onPress={onGoogleButtonHandler} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.signupText}>{i18next.t('login.redirect')}</Text>
            <Link
              style={styles.signupTextLink}
              title={i18next.t('register.submit')}
              onPress={onRegisterHandler}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    safeView: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    container: {
      height: '100%',
      width: '100%',
      padding: hp(2),
      backgroundColor: theme.backgroundLight,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    mainContent: {
      flex: 1,
    },
    title: {
      ...fontFamily.ROBOTO_BOLD,
      fontSize: fontSize.xxl,
      padding: hp(1),
      textAlign: 'center',
    },
    form: {
      paddingTop: hp(6),
    },
    controlGroup: {
      gap: hp(4),
    },
    forgotPassword: {
      paddingTop: hp(1),
      paddingBottom: hp(1),
      textAlign: 'right',
      color: theme.textLight,
      ...fontFamily.ROBOTO_MEDIUM,
      fontSize: fontSize.md,
    },
    errorMsg: {
      color: 'red',
      position: 'absolute',
      bottom: -18,
      left: 5,
      fontSize: fontSize.xs,
    },
    buttonGroup: {
      paddingTop: hp(2),
      gap: hp(3),
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
    },
    bottomText: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 5,
      width: '100%',
      paddingTop: hp(4),
      paddingBottom: hp(1),
    },
    signupText: {
      textAlign: 'center',
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      color: theme.textLight,
    },
    signupTextLink: {
      color: theme.primary,
      ...fontFamily.ROBOTO_BOLD,
      fontSize: fontSize.md,
    },
  });
};

export default LoginScreen;
