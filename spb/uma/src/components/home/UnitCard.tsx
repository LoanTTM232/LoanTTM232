import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import UnitPrice from '@/components/home/UnitPrice';
import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import { UnitPrice as UnitPriceObject } from '@/services/types';

interface UnitCardProps {
  title: string;
  address: string;
  price: UnitPriceObject[];
  image: string;
  distance?: string;
  onPress?: () => void;
}

const UnitCard: FC<UnitCardProps> = ({
  title,
  address,
  price,
  distance,
  image,
  onPress,
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
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {distance && (
            <View style={styles.distanceContainer}>
              <Text style={styles.distance}>{distance}</Text>
            </View>
          )}
        </View>
        <Text style={styles.address} numberOfLines={1}>
          {address}
        </Text>
        <UnitPrice prices={price} />
      </View>
    </Pressable>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: wp(75), // Increased width
      borderRadius: Radius.lg,
      marginRight: wp(3),
      backgroundColor: theme.backgroundLight,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden',
    },
    pressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    imageContainer: {
      height: hp(20),
      width: '100%',
      borderTopLeftRadius: Radius.lg,
      borderTopRightRadius: Radius.lg,
      backgroundColor: theme.backgroundDark,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      padding: hp(2),
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

export default memo(UnitCard);
