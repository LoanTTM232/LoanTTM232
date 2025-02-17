import { TextStyle } from 'react-native';

type FontFamilyKey =
  | 'SYSTEM'
  | 'ROBOTO_ITALIC'
  | 'ROBOTO_THIN'
  | 'ROBOTO_REGULAR'
  | 'ROBOTO_MEDIUM'
  | 'ROBOTO_BOLD';

type FontFamily = {
  fontFamily: string;
  fontStyle: TextStyle['fontStyle'];
  fontWeight: TextStyle['fontWeight'];
};

type FontFamilyStyles = Record<FontFamilyKey, FontFamily>;

type FontWeightStyles = Record<
  'normal' | 'medium' | 'bold',
  NonNullable<TextStyle['fontWeight']>
>;

export const fontSize: Record<
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
  number
> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 32,
};

const fontWeight: FontWeightStyles = {
  normal: '400',
  medium: '500',
  bold: '700',
};

export const fontFamily: FontFamilyStyles = {
  SYSTEM: {
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: fontWeight.normal,
  },
  ROBOTO_BOLD: {
    fontFamily: 'Roboto-Bold, Segoe UI Emoji, Noto Color Emoji',
    fontStyle: 'normal',
    fontWeight: fontWeight.bold,
  },
  ROBOTO_ITALIC: {
    fontFamily: 'Roboto-Italic, Segoe UI Emoji, Noto Color Emoji',
    fontStyle: 'italic',
    fontWeight: fontWeight.normal,
  },
  ROBOTO_MEDIUM: {
    fontFamily: 'Roboto-Medium, Segoe UI Emoji, Noto Color Emoji',
    fontStyle: 'normal',
    fontWeight: fontWeight.medium,
  },
  ROBOTO_REGULAR: {
    fontFamily: 'Roboto-Regular, Segoe UI Emoji, Noto Color Emoji',
    fontStyle: 'normal',
    fontWeight: fontWeight.normal,
  },
  ROBOTO_THIN: {
    fontFamily: 'Roboto-Thin, Segoe UI Emoji, Noto Color Emoji',
    fontStyle: 'normal',
    fontWeight: fontWeight.normal,
  },
};
