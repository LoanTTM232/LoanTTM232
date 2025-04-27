import React, { FC, useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_ICON_SIZE, fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import i18n from '@/helpers/i18n';
import { BookingTime, TimeRange } from '@/services/types';
import TimeCircleIcon from '@/ui/icon/TimeCircle';

type Props = {
  onPress: () => void;
  bookingTime?: BookingTime | undefined;
};

const TimeSelection: FC<Props> = ({ onPress, bookingTime }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable style={styles.iconWrapper} onPress={onPress}>
          <TimeCircleIcon color={theme.white} size={DEFAULT_ICON_SIZE + 4} />
        </Pressable>
        <View style={styles.iconTextWrapper}>
          <Text style={styles.iconText}>
            {i18n.t('booking.select_date.description')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      marginTop: hp(2),
      padding: wp(4),
      backgroundColor: theme.backgroundLight,
      borderRadius: Radius.md,
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(4),
    },
    iconWrapper: {
      width: wp(12),
      height: wp(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Radius.md,
      backgroundColor: theme.color2,
    },
    iconTextWrapper: {
      flex: 1,
      height: '100%',
    },
    iconText: {
      ...fontFamily.POPPINS_ITALIC,
      fontSize: fontSize.sm,
      color: theme.textLight,
      width: '80%',
    },
  });

export default React.memo(TimeSelection);
