import { Formik } from 'formik';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackButton from '@/components/button/Back';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import { registerValidation } from '@/helpers/validate';
import Button from '@/ui/button';
import Input from '@/ui/input';
import Link from '@/ui/link';

function RegisterScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <BackButton />
          <Text style={styles.title}>Get Started</Text>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={registerValidation}
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
                <View>
                  <Input
                    title="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorMsg}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                <Button
                  buttonStyle={{ marginTop: 10 }}
                  title="Sign Up"
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <View style={styles.bottomText}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Link href={'/login'} title="Signin" />
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

export default RegisterScreen;
