import React, { FC, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

import TimeSelection from '@/components/booking/TimeSelection';
import HeaderWithBack from '@/components/common/HeaderWithBack';
import UnitSummary from '@/components/common/UnitSummary';
import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import i18n from '@/helpers/i18n';
import Button from '@/ui/button/BaseButton';
import { useUnitStore } from '@/zustand';

const Booking: FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const unit = useUnitStore(useShallow((state) => state.currentUnit));

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    console.log('Booking confirmed');
  };

  return (
    <View style={styles.container}>
      <HeaderWithBack title={i18n.t('booking.title')} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Unit summary section */}
        <UnitSummary unit={unit} />

        {/* Time selector section */}
        <TimeSelection />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={i18n.t('booking.submit')}
          onPress={handleConfirmBooking}
          buttonStyle={styles.confirmButton}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.backgroundLight,
      position: 'relative',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      paddingHorizontal: wp(4),
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.backgroundLight,
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
    },
    confirmButton: {
      width: '100%',
      borderRadius: Radius.full,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: hp(4),
    },
    emptyText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.md,
      color: theme.textLight,
      textAlign: 'center',
    },
  });

export default Booking;
