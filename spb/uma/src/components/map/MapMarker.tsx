import React, { FC, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '@/contexts/theme';
import { GeographyModel } from '@/types/model';
import FullFillLocationIcon from '@/ui/icon/FullFillLocation';
import Mapbox from '@rnmapbox/maps';

interface MapMarkerProps {
  coord: GeographyModel;
  active: boolean;
  id: string;
}

const MapMarker: FC<MapMarkerProps> = ({ coord, active, id }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Mapbox.PointAnnotation
      id={`marker-${id}`}
      coordinate={[coord.longitude, coord.latitude]}
    >
      <View style={[styles.markerContainer, active && styles.activeMarker]}>
        <FullFillLocationIcon color={active ? theme.error : theme.primary} />
      </View>
    </Mapbox.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 15,
    height: 15,
  },
  activeMarker: {
    width: 20,
    height: 20,
  },
});

export default MapMarker;
