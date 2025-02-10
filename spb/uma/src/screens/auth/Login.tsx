import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackButton from '@/components/button/Back';
import GoogleSignIn from '@/components/button/GoogleSignIn';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import i18next from '@/helpers/i18n';
import { logError } from '@/helpers/logger';
import { toastError, toastSuccess } from '@/helpers/toast';
import { loginValidation } from '@/helpers/validate';
import { ParamList } from '@/screens';
import authService from '@/services/auth.service';
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
  const login = useAuthStore.use.login();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      scopes: ['email', 'profile'],
    });
  }, []);

  const onGoogleButtonHandler = async () => {
    try {
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken as string;

      const response = await authService.googleCallback({ code: idToken });
      if (response instanceof Error) {
        logError(response);
        toastError({ message: i18next.t('notification.login_failed') });
        return;
      }

      login(
        response.data.access_token,
        response.data.user.user_id,
        response.data.user.email,
        response.data.user.full_name
      );
      navigation.navigate('Tabs');
      toastSuccess({ message: i18next.t('notification.login_success') });
    } catch (error) {
      logError(error as Error);
      toastError({ message: i18next.t('notification.login_failed') });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
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
                <View>
                  <Input
                    title="Email Address"
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
                    title="Password"
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

                <Button
                  buttonStyle={styles.button}
                  title="Sign In"
                  onPress={handleSubmit}
                />
                <GoogleSignIn onPress={onGoogleButtonHandler} />
              </View>
            )}
          </Formik>
          <View style={styles.bottomText}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link
              title="Signup"
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (_: IColorScheme) => {
  return StyleSheet.create({
    container: {
      padding: hp(2),
      width: '100%',
    },
    title: {
      fontFamily: Font.family.bold,
      fontSize: Font.size.xxl,
      padding: hp(2),
    },
    form: {
      marginTop: hp(4),
      gap: hp(4),
    },
    errorMsg: {
      color: 'red',
      position: 'absolute',
      bottom: -18,
      left: 5,
      fontSize: Font.size.sm,
    },
    bottomText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      marginTop: hp(2),
      fontSize: Font.size.md,
    },
    button: {
      marginTop: 10,
    },
    signupText: {
      textAlign: 'center',
    },
  });
};

export default LoginScreen;
