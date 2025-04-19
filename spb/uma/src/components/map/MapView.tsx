import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MapCard from '@/components/map/MapCard';
import UnitMapCardSkeleton from '@/components/map/MapCardSkeleton';
import MapLocationButton from '@/components/map/MapLocationButton';
import MapMarker from '@/components/map/MapMarker';
import { IColorScheme, ZOOM_LEVEL } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import { debounce } from '@/helpers/function';
import { UnitCard } from '@/services/types';
import Slider from '@/ui/slider/Slider';
import { UnitRenderTypes, useLocationStore, useUnitStore } from '@/zustand';
import { useIsFocused } from '@react-navigation/native';
import Mapbox, { CameraStop, StyleURL } from '@rnmapbox/maps';

interface MapViewProps {
  unitId?: string;
  renderType?: UnitRenderTypes;
}

const MapView: FC<MapViewProps> = ({
  unitId,
  renderType = UnitRenderTypes.POPULAR,
}) => {
  const isFocused = useIsFocused();
  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [units, setUnits] = useState<UnitCard[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  const latitude = useLocationStore.use.latitude();
  const longitude = useLocationStore.use.longitude();

  const popularUnits = useUnitStore.use.popularUnits();
  const nearByUnits = useUnitStore.use.nearByUnits();
  const searchUnits = useUnitStore.use.searchUnits();

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const moveToLocationDebounced = useRef(
    debounce((lat: number, lng: number, zoomLevel?: number | undefined) => {
      if (!cameraRef.current || !isFocused) return;

      const cameraConfig: CameraStop = {
        centerCoordinate: [lng, lat],
        animationDuration: 1000,
        animationMode: 'flyTo',
      };

      if (zoomLevel) {
        cameraConfig.zoomLevel = zoomLevel;
      }
      cameraRef.current.setCamera(cameraConfig);
    }, 100)
  ).current;

  const handleSlideSelected = useCallback(
    (id: number) => {
      setActiveId(units[id].id);
    },
    [units]
  );

  const initialLocation = useCallback(
    (initialId: string) => {
      if (!mapRef.current) return;
      const activeUnit = units.find((unit) => unit.id === initialId);

      if (!activeUnit) {
        moveToLocationDebounced(latitude, longitude, ZOOM_LEVEL);
        return;
      }
      moveToLocationDebounced(
        activeUnit.coords.latitude,
        activeUnit.coords.longitude,
        ZOOM_LEVEL
      );
    },
    [latitude, longitude, moveToLocationDebounced, units]
  );

  const handleClickUnit = (id: string) => {
    console.log('handleClickUnit', id);
  };

  const isLoading = units === undefined || units.length === 0;

  useEffect(() => {
    let initialId = '';
    switch (renderType) {
      case UnitRenderTypes.POPULAR:
        setUnits(popularUnits);
        initialId = popularUnits[0].id;
        break;
      case UnitRenderTypes.NEARBY:
        setUnits(nearByUnits);
        initialId = nearByUnits[0].id;
        break;
      case UnitRenderTypes.SEARCH:
        setUnits(searchUnits);
        initialId = searchUnits[0].id;
        break;
    }

	console.log('MapView units', unitId);
    if (unitId) {
      initialId = unitId;
    }
    setActiveId(initialId);
  }, [popularUnits, nearByUnits, searchUnits, unitId, renderType]);

  useEffect(() => {
    if (!activeId) return;

    initialLocation(activeId);
  }, [activeId, initialLocation]);

  useEffect(() => {
    if (!isFocused) {
      setActiveId('');
      setUnits([]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isFocused && (
        <View style={styles.containerMap}>
          <Mapbox.MapView
            ref={mapRef}
            style={styles.map}
            styleURL={StyleURL.Light}
            testID={'unit-map'}
            zoomEnabled
            scrollEnabled
            pitchEnabled
            rotateEnabled
            logoEnabled={false}
            attributionEnabled={false}
            scaleBarEnabled={false}
          >
            <Mapbox.Camera ref={cameraRef} />
            <Mapbox.UserLocation />
            {units.length > 0 &&
              units.map((unit) => (
                <MapMarker
                  key={unit.id}
                  id={unit.id}
                  coord={unit.coords}
                  active={activeId === unit.id}
                />
              ))}
          </Mapbox.MapView>
          <MapLocationButton
            onPress={() => moveToLocationDebounced(latitude, longitude)}
            containerStyle={styles.gpsButton}
          />
        </View>
      )}
      {isLoading && <UnitMapCardSkeleton key="key-1" />}
      {!isLoading && (
        <Slider<UnitCard>
          data={units}
          containerStyle={styles.containerSlider}
          width={wp(100)}
          initialScrollIndex={units.findIndex((unit) => unit.id === activeId)}
          onSlideSelected={handleSlideSelected}
          renderItem={({ item }) => (
            <MapCard
              unitCard={item}
              onPress={() => handleClickUnit(item.id)}
              onPressLocation={() => {
                moveToLocationDebounced(
                  item.coords.latitude,
                  item.coords.longitude
                );
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    containerMap: {
      position: 'relative',
      flex: 1,
    },
    map: {
      flex: 1,
    },
    gpsButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      borderRadius: 24,
      backgroundColor: theme.primary,
    },
    containerSlider: {
      width: '100%',
      height: hp(24),
      marginBottom: hp(1),
    },
  });

export default MapView;
