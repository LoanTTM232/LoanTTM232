import React, { FC, useContext } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { DEFAULT_ICON_SIZE } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import MoveNotificationIcon from '@/ui/icon/MoveLocation';

export interface MapLocationButtonProps {
  onPress: () => void;
  containerStyle: StyleProp<ViewStyle>;
}

const MapLocationButton: FC<MapLocationButtonProps> = ({
  onPress,
  containerStyle,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <MoveNotificationIcon color={theme.white} size={DEFAULT_ICON_SIZE + 5} />
    </Pressable>
  );
};

export default MapLocationButton;

const styles = StyleSheet.create({
  container: {
    width: DEFAULT_ICON_SIZE * 2,
    height: DEFAULT_ICON_SIZE * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
