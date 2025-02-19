import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { hp } from '@/helpers/dimensions';

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    success: {
      borderLeftColor: theme.success,
      borderLeftWidth: 6,
      borderRadius: 0,
      height: hp(6.6),
    },
    successContent: {
      paddingHorizontal: hp(2),
    },
    successText1: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.md,
    },
    error: {
      borderLeftColor: theme.error,
      borderLeftWidth: 6,
      borderRadius: 0,
      height: hp(6.6),
    },
    errorContent: {
      paddingHorizontal: hp(2),
    },
    errorText1: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.md,
    },
    errorText2: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.md,
    },
    iconContainer: {
      height: '100%',
      width: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

const onPressHandler = () => {
  Toast.hide();
};

export const toastConfig = (theme: IColorScheme) => {
  const styles = createStyles(theme);

  return {
    success: (props: BaseToastProps): React.ReactNode => (
      <BaseToast
        {...props}
        style={styles.success}
        contentContainerStyle={styles.successContent}
        renderLeadingIcon={() => (
          <View style={styles.iconContainer}>
            <AntDesign name="check" size={22} color={theme.success} />
          </View>
        )}
        text1Style={styles.successText1}
        onPress={onPressHandler}
      />
    ),

    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={styles.error}
        contentContainerStyle={styles.errorContent}
        text1Style={styles.errorText1}
        text2Style={styles.errorText2}
        renderLeadingIcon={() => (
          <View style={styles.iconContainer}>
            <MaterialIcons name="error-outline" size={22} color={theme.error} />
          </View>
        )}
      />
    ),
  };
};

export const toastSuccess = (text1: string, text2?: string) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
  });
};

export const toastError = (text1: string, text2?: string) => {
  Toast.show({
    type: 'error',
    text1,
    text2,
  });
};
