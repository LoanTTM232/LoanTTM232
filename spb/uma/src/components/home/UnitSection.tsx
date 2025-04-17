import React, { FC, useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import UnitCard from '@/components/home/UnitCard';
import UnitCardSkeleton from '@/components/home/UnitCardSkeleton';
import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import { UnitCard as UnitCardObject } from '@/services/types';

interface UnitSectionProps {
  title: string;
  units?: UnitCardObject[];
  isLoading: boolean;
}

const UnitSection: FC<UnitSectionProps> = ({ title, units, isLoading }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={() => console.log('See all pressed')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading && <UnitCardSkeleton />}
        {units?.map((unit) => (
          <UnitCard
            key={unit.id}
            title={unit.title}
            address={unit.address}
            price={unit.price}
            image={unit.image}
            distance={unit.distance}
            onPress={() => console.log('Unit pressed:', unit.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: hp(2),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      marginBottom: hp(2),
    },
    title: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.lg,
      color: theme.textDark,
    },
    seeAll: {
      ...fontFamily.RALEWAY_MEDIUM,
      fontSize: fontSize.sm,
      color: theme.primary,
    },
    scrollContent: {
      paddingHorizontal: wp(4),
      paddingBottom: hp(2),
    },
  });

export default UnitSection;
