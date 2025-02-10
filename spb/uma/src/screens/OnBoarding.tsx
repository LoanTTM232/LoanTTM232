import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from '@/components/ScreenWrapper';
import { Color } from '@/constants';
import { hp, wp } from '@/helpers/dimensions';
import { ParamList } from '@/screens';
import Link from '@/ui/link';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const OnBoarding: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/welcome.png')}
        />
        <View style={styles.footer}>
          <View style={styles.bottomText}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Link title="Login" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

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
    gap: hp(2),
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

export default OnBoarding;
