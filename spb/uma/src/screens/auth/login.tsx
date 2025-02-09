import { Formik } from 'formik';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackButton from '@/components/button/Back';
import GoogleSignIn from '@/components/button/GoogleSignIn';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import { loginValidation } from '@/helpers/validate';
import { RootStackParamList } from '@/screens';
import Button from '@/ui/button';
import Input from '@/ui/input';
import Link from '@/ui/link';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Login: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const onGoogleButtonPress = async () => {
    console.log('alo');
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
                <GoogleSignIn onPress={onGoogleButtonPress} />
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

export default Login;
