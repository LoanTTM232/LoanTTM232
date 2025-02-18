import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import GoogleSignIn from '@/components/button/GoogleSignIn';
import FormField from '@/components/field/FormField';
import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { hp } from '@/helpers/dimensions';
import i18next from '@/helpers/i18n';
import { loginValidation } from '@/helpers/validate';
import { ILoginFormValues } from '@/screens/auth/login';
import Button from '@/ui/button';
import Line from '@/ui/line';
import Link from '@/ui/link';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  theme: IColorScheme;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleSignIn,
  theme,
}) => {
  const styles = createStyles(theme);
  const initialValues: ILoginFormValues = {
    email: '',
    password: '',
  };

  const handleFormSubmit = useCallback(
    (values: { email: string; password: string }) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={handleFormSubmit}
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
            <FormField
              title="login.email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              handleChange={handleChange('email')}
              handleBlur={handleBlur('email')}
              keyboardType="email-address"
              theme={theme}
            />
            <FormField
              title="login.password"
              value={values.password}
              error={errors.password}
              touched={touched.password}
              handleChange={handleChange('password')}
              handleBlur={handleBlur('password')}
              type="password"
              theme={theme}
            />
          </View>
          <View style={styles.optionGroup}>
            <Link
              title={i18next.t('login.forgot')}
              onPress={handleForgotPassword}
              style={styles.link}
            />
          </View>
          <View style={styles.buttonGroup}>
            <Button
              buttonStyle={styles.button}
              textStyles={styles.buttonText}
              title={i18next.t('login.submit')}
              onPress={handleSubmit}
            />
            <Line title="Or" theme={theme} />
            <GoogleSignIn
              onPress={onGoogleSignIn}
              title={i18next.t('login.google')}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    form: {
      paddingTop: hp(3),
    },
    controlGroup: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: hp(2),
    },
    optionGroup: {
      flexDirection: 'row',
      marginTop: hp(2),
      justifyContent: 'flex-end',
    },
    link: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      color: theme.primary,
    },
    buttonGroup: {
      paddingTop: hp(4),
      gap: hp(3),
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
    },
  });
};

export default LoginForm;
