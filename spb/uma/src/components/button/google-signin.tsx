import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import i18next from '@/helpers/i18n';
import Button from '@/ui/button';
import GoogleIcon from '@/ui/icon/google';

export type GoogleSignInProps = {
  onPress: () => void;
};

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onPress }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  //   return <GoogleSigninButton style={styles.button} onPress={onPress} />;
  return (
    <Button
      buttonStyle={styles.button}
      textStyles={styles.buttonText}
      title={i18next.t('login.google')}
      onPress={onPress}
      before={<GoogleIcon size={22} />}
    />
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    button: {
      backgroundColor: theme.secondary,
    },
    buttonText: {
      ...fontFamily.ROBOTO_REGULAR,
      fontSize: fontSize.md,
      color: theme.textLight,
    },
  });
};

export default GoogleSignIn;
