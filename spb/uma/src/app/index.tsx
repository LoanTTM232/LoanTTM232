import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from '@/components/ScreenWrapper';
import { Color } from '@/constants';
import { hp, wp } from '@/helpers/dimensions';
import Button from '@/ui/button';
import Link from '@/ui/link';

function OnBoardingScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar style={'auto'} />
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/welcome.png')}
        />
        <View style={styles.footer}>
          <Button
            title="Get Start Now"
            onPress={() => router.push('/(auth)/register')}
          />
          <View style={styles.bottomText}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Link title="Login" href={'/(auth)/login'} />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.light.background,
    paddingHorizontal: wp(4),
  },
  image: {
    width: wp(100),
    height: hp(45),
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    fontSize: hp(1.5),
  },
});

export default OnBoardingScreen;
