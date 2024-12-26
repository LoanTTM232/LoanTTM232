import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackButton from '@/components/button/Back';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Font, IColorScheme } from '@/constants';
import { WEB_CLIENT_ID } from '@/constants/env';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import { loginValidation } from '@/helpers/validate';
import Button from '@/ui/button';
import Input from '@/ui/input';
import Link from '@/ui/link';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

function LoginScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
        });
      }
    }
    init();
  }, []);

  const onGoogleButtonPress = async () => {};

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <BackButton />
          <Text style={styles.title}>Welcome back</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidation}
            onSubmit={(values, { setSubmitting }) => {
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
                  buttonStyle={{ marginTop: 10 }}
                  title="Sign In"
                  onPress={handleSubmit}
                />
                <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
              </View>
            )}
          </Formik>
          <View style={styles.bottomText}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href={'/register'} title="Signup" />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const createStyles = (theme: IColorScheme) => {
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
    signupText: {
      textAlign: 'center',
    },
  });
};

export default LoginScreen;
