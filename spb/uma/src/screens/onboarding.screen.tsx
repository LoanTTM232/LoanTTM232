import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Color, Font, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp, wp } from '@/helpers/dimensions';
import { ParamList } from '@/screens';
import Link from '@/ui/link';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const OnBoarding: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/welcome.png')}
        />
        <View style={styles.footer}>
          <View style={styles.bottomText}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Link
              style={styles.loginTextLink}
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: Color.light.backgroundSoft,
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
      fontSize: Font.size.md,
    },
    loginTextLink: {
      color: theme.primary,
    },
  });
};

export default OnBoarding;
