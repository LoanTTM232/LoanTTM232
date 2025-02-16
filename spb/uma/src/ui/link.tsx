import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';

import { Font } from '@/constants';

export type LinkProps = {
  title: string;
  style: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
};

const Link: React.FC<LinkProps> = ({ title, style, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.link, style]}> {title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    fontFamily: Font.family.medium,
    textDecorationLine: 'underline',
  },
});

export default Link;
