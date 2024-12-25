import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Color, Font } from '@/constants';
import { hp } from '@/helpers/dimensions';

export interface LinkProps {
  title: string;
  href: Href;
}

function Link({ title, href }: LinkProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(href)}>
      <Text style={styles.link}> {title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    color: Color.light.primary,
    textAlign: 'center',
    fontSize: hp(1.5),
    fontFamily: Font.family.medium,
  },
});

export default Link;
