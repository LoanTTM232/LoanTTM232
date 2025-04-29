import React, { FC, useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import ChangePasswordForm from '@/components/auth/ChangePasswordForm';
import HeaderWithBack from '@/components/common/HeaderWithBack';
import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { ResponseError } from '@/helpers/error';
import i18n from '@/helpers/i18n';
import { logError } from '@/helpers/logger';
import { toastError, toastSuccess } from '@/helpers/toast';
import { useAuthStore } from '@/zustand';
import { useNavigation } from '@react-navigation/native';

const ChangePassword: FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const changePassword = useAuthStore((state) => state.changePassword);

  const handleSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toastSuccess(i18n.t('profile:change_password.password_changed_success'));
      navigation.goBack();
    } catch (err) {
      logError(err as ResponseError);
      toastError(i18n.t('profile:change_password.password_changed_error'));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithBack title={i18n.t('profile:change_password.change_password')} />
      <View style={styles.container}>
        <ChangePasswordForm theme={theme} onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContent,
    },
  });

export default ChangePassword;
