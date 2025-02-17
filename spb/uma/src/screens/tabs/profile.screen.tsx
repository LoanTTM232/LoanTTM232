import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { ParamList } from '@/screens';
import Button from '@/ui/button';
import { useAuthStore } from '@/zustand';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();

  const logout = useAuthStore.use.logout();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const logoutHandler = async () => {
    await logout();

    // navigate to login screen
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
};

const createStyles = (_: IColorScheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'cyan',
    },
  });
};

export default ProfileScreen;
