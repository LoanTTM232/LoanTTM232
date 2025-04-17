import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily, fontSize } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';
import { UnitPrice as UnitPriceObject } from '@/services/types';

const UnitPrice: React.FC<{ prices: UnitPriceObject[] }> = ({ prices }) => {
  const { theme } = React.useContext(ThemeContext);

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
            {p.price.toLocaleString()} {p.currency} / hour
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: hp(1) },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
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
