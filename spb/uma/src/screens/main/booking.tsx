import React, { FC, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

import TimeSelection from '@/components/booking/TimeSelection';
import TimeSelectionModal from '@/components/booking/TimeSelectionModal';
import HeaderWithBack from '@/components/common/HeaderWithBack';
import UnitSummary from '@/components/common/UnitSummary';
import { IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import i18n from '@/helpers/i18n';
import Button from '@/ui/button/BaseButton';
import { useUnitStore } from '@/zustand';

const Booking: FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [timelineModalVisible, setTimelineModalVisible] =
    useState<boolean>(false);

  const unit = useUnitStore(useShallow((state) => state.currentUnit));

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    console.log('Booking confirmed');
  };

  return (
    <View style={styles.container}>
      <HeaderWithBack title={i18n.t('booking.title')} isClose={false} />

      <ScrollView
        style={styles.scrollBox}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Unit summary section */}
        <UnitSummary unit={unit} />

        {/* Time selector section */}
        <TimeSelection onPress={() => setTimelineModalVisible(true)} />
        <TimeSelectionModal
          visible={timelineModalVisible}
          onClose={() => setTimelineModalVisible(false)}
        />

        <View style={styles.footerSpacer} />
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
      backgroundColor: theme.backgroundDark,
      position: 'relative',
      flexDirection: 'column',
    },
    scrollBox: {
      flex: 1,
    },
    content: {
      gap: hp(1),
      paddingHorizontal: wp(4),
    },
    footerSpacer: {
      height: hp(12),
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      width: wp(100),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: hp(1),
    },
    confirmButton: {
      width: '100%',
      borderRadius: Radius.full,
    },
  });

export default React.memo(Booking);
