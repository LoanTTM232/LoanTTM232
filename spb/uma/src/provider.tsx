import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/contexts/themeContext';

export type ProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
