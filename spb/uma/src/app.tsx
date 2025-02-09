import React from 'react';

import AppProvider from '@/provider';
import RootStack from '@/screens';

const App: React.FC = () => {
  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
};

export default App;
