import React, { useEffect } from 'react';

import AppProvider from '@/providers';
import RootStack from '@/screens';
import { useAuthStore } from '@/zustand';

const App: React.FC = () => {
  const checkIsLoggedIn = useAuthStore.use.checkIsLoggedIn();

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
};

export default App;
