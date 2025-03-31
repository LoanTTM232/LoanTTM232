import React, { FC, memo } from 'react';
import { Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UnitTabButtonProps } from '@/components/home/types';
import { DEFAULT_ICON_SIZE } from '@/constants';

const UnitTabButton: FC<UnitTabButtonProps> = ({
  route,
  isActive,
  onPress,
  styles,
  iconActiveColor,
  iconInactiveColor,
}) => (
  <Pressable
    onPress={onPress}
    style={[styles.tab]}
    accessibilityRole="tab"
    accessibilityState={{ selected: isActive }}
  >
    <Ionicons
      name={route.icon}
      size={DEFAULT_ICON_SIZE}
      color={isActive ? iconActiveColor : iconInactiveColor}
    />
    <Text style={[styles.tabText]}>{route.title}</Text>
  </Pressable>
);

export default memo(UnitTabButton);
