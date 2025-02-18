import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IColorScheme } from '@/constants';

interface CheckBoxProps {
  title: string;
  onChecked: (checked: boolean) => void;
  theme: IColorScheme;
}

const CheckBox: FC<CheckBoxProps> = ({ title, onChecked, theme }) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChecked(newChecked);
  };

  const styles = createStyles(theme);

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.box, checked && styles.checkedBox]} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    box: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: theme.borderDark,
      marginRight: 10,
    },
    checkedBox: {
      backgroundColor: theme.primary,
    },
    title: {
      color: theme.textLight,
    },
  });

export default CheckBox;
