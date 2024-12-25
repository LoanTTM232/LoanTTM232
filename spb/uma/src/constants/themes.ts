export interface IColorScheme {
  background: string;
  primary: string;
  secondary: string;
  shadow: string;
  icon: string;
}
export interface IColor {
  light: IColorScheme;
  dark: IColorScheme;
}

export const Color: IColor = {
  light: {
    background: '#FFFFFF',
    primary: '#E86F00',
    secondary: '#F7F7F9',
    shadow: '#000000',
    icon: '#6A6A6A',
  },
  dark: {
    background: 'black',
    primary: 'black',
    secondary: 'black',
    shadow: '#000000',
    icon: '#6A6A6A',
  },
};

export const Radius = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
};

export const Font = {
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 32,
  },
  family: {
    italic: 'Roboto-Italic',
    thin: 'Roboto-Thin',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    raleway: 'Raleway-Regular',
    ralewayMedium: 'Raleway-Medium',
  },
};
