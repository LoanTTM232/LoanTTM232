import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/contexts/themeContext';

export type ProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <RootSiblingParent>
      <ThemeProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
};

export default AppProvider;
