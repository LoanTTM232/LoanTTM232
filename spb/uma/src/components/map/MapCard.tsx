import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_ICON_SIZE, fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import { UnitCard } from '@/services/types';
import FullFillLocationIcon from '@/ui/icon/FullFillLocation';
import MoveLocation from '@/ui/icon/MoveLocation';

interface MapUnitCardProps {
  unitCard: UnitCard;
  onPress: () => void;
  onPressLocation: () => void;
}

const MapUnitCard: FC<MapUnitCardProps> = ({
  unitCard,
  onPress,
  onPressLocation,
}) => {
  const { theme } = React.useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: unitCard.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {unitCard.title}
          </Text>
          <Pressable
            style={styles.distanceContainer}
            onPress={onPressLocation}
          >
            <MoveLocation color={theme.icon} size={DEFAULT_ICON_SIZE - 8} />
            <Text style={styles.distance}>{unitCard.distance}</Text>
          </Pressable>
        </View>
        <View style={styles.addressRow}>
          <FullFillLocationIcon
            color={theme.primary}
            size={DEFAULT_ICON_SIZE - 8}
          />
          <Text style={styles.address} numberOfLines={1}>
            {unitCard.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: wp(60),
      borderRadius: Radius.lg,
      backgroundColor: theme.backgroundLight,
    },
    pressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    imageContainer: {
      height: hp(14),
      width: '100%',
      borderRadius: Radius.lg,
      backgroundColor: theme.backgroundDark,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      paddingHorizontal: hp(2),
      paddingVertical: hp(1),
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp(1),
    },
    address: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.xs,
      color: theme.textLight,
      marginBottom: hp(1),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(0.5),
    },
    distanceContainer: {
      backgroundColor: theme.backgroundDark,
      paddingHorizontal: wp(2),
      paddingVertical: hp(0.5),
      borderRadius: Radius.sm,
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: wp(50),
      gap: wp(1),
    },
    distance: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.xs,
      color: theme.textLight,
    },
    title: {
      ...fontFamily.POPPINS_BOLD,
      fontSize: fontSize.sm,
      color: theme.textDark,
      flex: 1,
      marginRight: wp(2),
    },
  });

export default memo(MapUnitCard);
