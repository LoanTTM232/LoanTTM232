import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily, fontSize, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';
import { UnitPrice as UnitPriceObject } from '@/services/types';

const UnitPrice: React.FC<{ prices: UnitPriceObject[] }> = ({ prices }) => {
  const { theme } = React.useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {prices.map((p, i) => (
        <View
          key={i}
          style={[styles.row, { borderBottomColor: theme.borderLight }]}
        >
          <Text style={[styles.time, { color: theme.textLight }]}>
            {p.startTime} - {p.endTime}
          </Text>
          <Text style={[styles.price, { color: theme.primary }]}>
            {p.price.toLocaleString()} {p.currency}/h
          </Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: IColorScheme) => StyleSheet.create({
  container: { paddingTop: hp(1) },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.5),
    borderBottomWidth: 0.2,
	borderBottomColor: theme.borderLight,
  },
  time: {
    ...fontFamily.POPPINS_REGULAR,
    fontSize: fontSize.xs,
  },
  price: {
    ...fontFamily.POPPINS_BOLD,
    fontSize: fontSize.xs,
  },
});

export default UnitPrice;
