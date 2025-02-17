export interface IColorScheme {
  backgroundLight: string;
  backgroundDark: string;
  backgroundContent: string;
  primary: string;
  secondary: string;
  shadow: string;
  icon: string;
  textLight: string;
  textDark: string;
  success: string;
  error: string;
  warning: string;
}
export interface IColor {
  light: IColorScheme;
  dark: IColorScheme;
}

export const Color: IColor = {
  light: {
    backgroundLight: '#FFFFFF',
    backgroundDark: '#F2F2F2',
    backgroundContent: '#F7F7F9',
    primary: '#E86F00',
    secondary: '#F7F7F9',
    shadow: '#000000',
    icon: '#6A6A6A',
    textLight: '#6A6A6A',
    textDark: '#000000',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFFF00',
  },
  dark: {
    backgroundLight: '#FFFFFF',
    backgroundDark: '#F2F2F2',
    backgroundContent: '#F7F7F9',
    primary: '#E86F00',
    secondary: '#F7F7F9',
    shadow: '#000000',
    icon: '#6A6A6A',
    textLight: '#6A6A6A',
    textDark: '#000000',
    success: '#008000',
    error: '#FF0000',
    warning: '#FFFF00',
  },
};

export const Radius = {
  xs: 8,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
};
