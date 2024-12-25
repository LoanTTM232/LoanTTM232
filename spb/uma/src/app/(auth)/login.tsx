import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackButton from '@/components/button/Back';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/themeContext';
import { hp } from '@/helpers/dimensions';
import Button from '@/ui/button';
import Input from '@/ui/input';

function LoginScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.container}>
          <BackButton />
          <Text style={styles.title}>Welcome Back</Text>
          <View style={styles.form}>
            <Input
              title="Email Address"
              type="text"
              placeholder="xyz@gmail.com"
            />
            <Input title="Password" type="password" placeholder="••••••••" />
            <View>
              <Button title="Sign In" />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: hp(2),
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
  });
};

export default LoginScreen;
