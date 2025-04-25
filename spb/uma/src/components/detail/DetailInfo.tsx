import React, { FC, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import UnitPrice from '@/components/home/UnitPrice';
import { DEFAULT_ICON_SIZE, fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import i18n from '@/helpers/i18n';
import { MainStackParamList } from '@/screens/main';
import { UnitCard } from '@/services/types';
import Button from '@/ui/button/BaseButton';
import AddCategoryIcon from '@/ui/icon/AddCategory';
import DollarCircleIcon from '@/ui/icon/DollarCircle';
import FullFillLocationIcon from '@/ui/icon/FullFillLocation';
import MoveLocation from '@/ui/icon/MoveLocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  unit: UnitCard;
};

const DetailInfo: FC<Props> = ({ unit }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleBookNow = () => {
    navigation.navigate('Booking');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.body}
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main info section */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={1}>
              {unit.title}
            </Text>
            <View style={styles.locationButton}>
              <MoveLocation color={theme.icon} size={DEFAULT_ICON_SIZE - 4} />
              <Text style={styles.distance}>{unit.distance}km</Text>
            </View>
          </View>

          <View style={styles.infoContent}>
            <View style={styles.address}>
              <FullFillLocationIcon
                size={DEFAULT_ICON_SIZE - 4}
                color={theme.primary}
              />
              <Text
                style={styles.secondaryText}
                numberOfLines={2}
              >
                {unit.address}
              </Text>
            </View>
            <View style={styles.phone}>
              <Text
                style={styles.secondaryText}
                numberOfLines={3}
              >
                {unit.phone}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.secondaryText} numberOfLines={3}>
                {unit.description}
              </Text>
            </View>
          </View>
        </View>

        {/* Price section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarCircleIcon
              size={DEFAULT_ICON_SIZE - 4}
              color={theme.primary}
            />
            <Text style={styles.sectionTitle}>Price</Text>
          </View>
          <View style={styles.priceContainer}>
            <UnitPrice prices={unit.price} />
          </View>
        </View>

        {/* Services section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AddCategoryIcon
              size={DEFAULT_ICON_SIZE - 4}
              color={theme.primary}
            />
            <Text style={styles.sectionTitle}>Services & Amenities</Text>
          </View>

          {unit.services && unit.services.length > 0 ? (
            <View style={styles.servicesContainer}>
              {unit.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Text style={styles.serviceText}>{service.title}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noServices}>
              No services information available
            </Text>
          )}
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={i18n.t('detail.book_now')}
          onPress={handleBookNow}
          buttonStyle={styles.bookButton}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
      position: 'relative',
      backgroundColor: theme.backgroundLight,
    },
    body: {
      paddingHorizontal: wp(2),
      paddingTop: hp(1),
    },
    scrollContent: {
      flex: 1,
    },
    section: {
      marginBottom: hp(4),
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(2),
    },
    infoContent: {
      paddingHorizontal: wp(1),
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp(1),
      paddingHorizontal: wp(1),
    },
    sectionTitle: {
      ...fontFamily.POPPINS_BOLD,
      fontSize: fontSize.md,
      color: theme.textDark,
      marginLeft: wp(2),
    },
    title: {
      ...fontFamily.POPPINS_BOLD,
      fontSize: fontSize.md,
      color: theme.textDark,
      flex: 1,
      marginRight: wp(2),
    },
    secondaryText: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.xs,
      color: theme.textLight,
      flex: 1,
    },
    address: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: wp(2),
      paddingRight: wp(4),
      marginBottom: hp(0.5),
    },
    phone: {
      marginLeft: wp(7),
      flexDirection: 'row',
      paddingRight: wp(4),
      marginBottom: hp(0.5),
    },
    description: {
      marginLeft: wp(7),
      flexDirection: 'row',
      paddingRight: wp(4),
    },
    locationButton: {
      backgroundColor: theme.backgroundDark,
      paddingHorizontal: wp(2.5),
      paddingVertical: hp(0.5),
      borderRadius: Radius.full,
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(1.5),
    },
    distance: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.textLight,
    },
    priceContainer: {
      width: '100%',
      paddingHorizontal: wp(4),
    },
    servicesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp(2),
      paddingHorizontal: wp(1),
    },
    serviceItem: {
      backgroundColor: theme.backgroundDark,
      paddingHorizontal: wp(2.5),
      paddingVertical: hp(0.6),
      borderRadius: Radius.full,
      marginBottom: hp(1),
    },
    serviceText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.textDark,
    },
    noServices: {
      ...fontFamily.POPPINS_ITALIC,
      fontSize: fontSize.xs,
      color: theme.textLight,
      paddingHorizontal: wp(2),
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
      paddingVertical: hp(2),
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
      backgroundColor: theme.backgroundLight,
      elevation: 4,
    },
    bookButton: {
      width: wp(60),
      borderRadius: Radius.full,
      paddingVertical: hp(1.2),
    },
  });

export default DetailInfo;
