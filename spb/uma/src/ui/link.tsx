import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { Color, Font } from '@/constants';
import { hp } from '@/helpers/dimensions';

export type LinkProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Link: React.FC<LinkProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.link}> {title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Color.light.primary,
    textAlign: 'center',
    fontSize: hp(1.5),
    fontFamily: Font.family.medium,
  },
});

export default Link;
