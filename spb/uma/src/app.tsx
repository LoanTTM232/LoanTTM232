import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from '@/providers';
import RootStack from '@/screens';
import { useAuthStore } from '@/zustand';

const App: React.FC = () => {
  const checkIsLoggedIn = useAuthStore.use.checkIsLoggedIn();

  useEffect(() => {
    SplashScreen.hide();
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
};

export default App;
