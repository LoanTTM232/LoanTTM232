import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DEFAULT_ICON_SIZE, fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import BackButton from '@/ui/button/Back';
import CloseIcon from '@/ui/icon/Close';

type HeaderProps = {
  title: string;
};

const HeaderWithBack: FC<HeaderProps> = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <BackButton
        icon={<CloseIcon size={DEFAULT_ICON_SIZE} color={theme.primary} />}
      />
      <View style={styles.title}>
        <Text style={{ color: theme.textDark }}>{title}</Text>
      </View>
    </View>
  );
};

const createStyles = (_: IColorScheme) =>
  StyleSheet.create({
    header: {
      height: hp(7),
      width: '100%',
      flexDirection: 'row',
    },
    title: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: wp(12),
      ...fontFamily.POPPINS_BOLD,
      fontSize: fontSize.lg,
    },
  });

export default HeaderWithBack;
