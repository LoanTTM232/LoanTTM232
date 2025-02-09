import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import env from '@/helpers/env';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

export type GoogleSignInProps = {
  onPress: () => void;
};

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onPress }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          webClientId: env.WEB_CLIENT_ID,
        });
      }
    }
    init();
  }, []);

  return <GoogleSigninButton style={styles.button} onPress={onPress} />;
};

const createStyles = (_: IColorScheme) => {
  return StyleSheet.create({
    button: {
      height: hp(6.6),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: 8,
      fontSize: hp(2.2),
      fontFamily: Font.family.medium,
    },
  });
};

export default GoogleSignIn;
