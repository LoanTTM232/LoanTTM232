import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '@/components/button/back';
import GoogleSignIn from '@/components/button/google-signin';
import { Font, IColorScheme } from '@/constants';
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
      toastSuccess({ message: i18next.t('notification.login_success') });
    } catch (error) {
      logError(error as Error);
      toastError({ message: i18next.t('notification.login_failed') });
    }
  };

  const onForgotPasswordHandler = () => {
    logDebug('Forgot password');
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
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
        <View style={styles.bottomText}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Link
            style={styles.signupTextLink}
            title="Signup"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      padding: hp(2),
      backgroundColor: theme.backgroundSoft,
    },
    title: {
      fontFamily: Font.family.ralewayMedium,
      fontSize: Font.size.xxl,
      padding: hp(2),
    },
    form: {
      marginTop: hp(4),
    },
    controlGroup: {
      gap: hp(4),
    },
    forgotPassword: {
      paddingTop: hp(1),
      paddingBottom: hp(1),
      textAlign: 'right',
      color: theme.text,
    },
    errorMsg: {
      color: 'red',
      position: 'absolute',
      bottom: -18,
      left: 5,
      fontSize: Font.size.sm,
    },
    buttonGroup: {
      paddingTop: hp(2),
      gap: hp(3),
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      fontSize: Font.size.lg,
      fontFamily: Font.family.regular,
    },
    bottomText: {
      top: hp(2),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 5,
      fontFamily: Font.family.italic,
      fontSize: Font.size.md,
    },
    signupText: {
      textAlign: 'center',
    },
    signupTextLink: {
      color: theme.primary,
    },
  });
};

export default LoginScreen;
