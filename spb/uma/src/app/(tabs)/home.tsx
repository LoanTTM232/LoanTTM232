import React from 'react';
import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>home screen</Text>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

export default HomeScreen;
