import { Appearance } from 'react-native';

export type ColorSchemeType = 'light' | 'dark' | null;

export const useSelectedTheme = () => {
  const theme = Appearance.getColorScheme();
  const setSelectedTheme = Appearance.setColorScheme;

  const selectedTheme = (theme ?? 'system') as ColorSchemeType;
  return { selectedTheme, setSelectedTheme } as const;
};
