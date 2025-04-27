import React, { FC, Fragment, useCallback, useContext, useRef, useState } from 'react';
import {
  Animated, PanResponder, Pressable, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Timeline, TimelineProps } from 'react-native-calendars';
import { PackedEvent } from 'react-native-calendars/src/timeline/EventBlock';
import { HOUR_BLOCK_HEIGHT, UnavailableHours } from 'react-native-calendars/src/timeline/Packer';

import EdgeResize from '@/components/booking/EdgeResize';
import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';

type Props = TimelineProps & {
  onAddNewEvent: (startTime: number, endTime: number) => void;
};

const TimelineDay: FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const [isPressed, setPressed] = useState<boolean>(false);
  const scrollY = useRef<number>(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(0)).current;
  const { unavailableHours } = props;

  // Format time for display (HH:MM format)
  const formatTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const snapSizePx = HOUR_BLOCK_HEIGHT / 2;
  const snapToInterval = useCallback((value: number) => {
    return Math.round(value / snapSizePx) * snapSizePx;
  }, []);

  const nextBlockValidate = (
    unavailableHours: UnavailableHours[] | undefined,
    newTop: number
  ): boolean => {
    if (unavailableHours && unavailableHours.length > 0) {
      const newLocation = scrollY.current + newTop;
      const newHour = newLocation / HOUR_BLOCK_HEIGHT;

      if (
        unavailableHours.find((uh) => uh.start < newHour && newHour < uh.end)
      ) {
        return false;
      }
    }
    return true;
  };

  const startTop = useRef<number>(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        animatedTop.stopAnimation((value) => {
          startTop.current = value;
        });
      },

      onPanResponderMove: (e, g) => {
        const newTop = startTop.current + g.dy;
        // Can not move box outside range (0 hour to 24 hour)
        if (newTop < 0) return;
        // Can not move box outside available hour range
        if (!nextBlockValidate(unavailableHours, newTop)) {
          // Set newTop for nearest block
          return;
        }
        // @ts-ignore
        const newBottom = newTop + animatedHeight.__getValue();
        if (!nextBlockValidate(unavailableHours, newBottom)) {
          return;
        }

        if (newBottom > hp(65)) {
          return;
        }

        animatedTop.setValue(newTop);
      },

      onPanResponderRelease: () => {
        animatedTop.flattenOffset();
        // @ts-ignore
        const deltaY = animatedTop.__getValue() - startTop.current;
        animatedTop.setValue(startTop.current + snapToInterval(deltaY));
      },
    })
  ).current;

  const nextSnapBlock = (yPosition: number, scrollY: number): number => {
    const deltaY = yPosition - scrollY;
    const gapScroll = snapToInterval(scrollY) - scrollY;
    return snapToInterval(deltaY - gapScroll) + gapScroll;
  };

  return (
    <View style={styles.timelineContainer}>
      <Timeline
        {...props}
        onBackgroundLongPress={(ts, time, yPosition) => {
          props.onBackgroundLongPress?.(ts, time, yPosition);
          const nextSnapBlockVal = nextSnapBlock(yPosition, scrollY.current);

          let topVal: number;
          if (nextSnapBlockVal - (yPosition - scrollY.current) <= 0) {
            topVal = nextSnapBlockVal;
          } else {
            topVal = nextSnapBlockVal - snapSizePx;
          }

          animatedTop.setValue(topVal);
          animatedHeight.setValue(snapSizePx);
          setPressed(true);
        }}
        renderEvent={(event: PackedEvent) => (
          <TouchableOpacity
            style={[styles.event, { backgroundColor: event.color }]}
          >
            <Text style={styles.eventTime}>
              {formatTime(event.start)} - {formatTime(event.end)}
            </Text>
          </TouchableOpacity>
        )}
        showNowIndicator
        format24h
        scrollY={scrollY}
      />
      {isPressed && (
        <Fragment>
          <View style={styles.selectionLayer} />
          <Animated.View
            style={[
              styles.selectionBox,
              {
                top: animatedTop,
                height: animatedHeight,
                left: 72,
              },
            ]}
          >
            <View
              style={[
                styles.selectionBoxInside,
                { backgroundColor: theme.color1 },
              ]}
              {...panResponder.panHandlers}
            >
              <Pressable
                style={styles.selectionBoxInside}
                onPress={() => {
                  setPressed(false);
                  const startTime =
                    // @ts-ignore
                    Math.floor(scrollY.current + animatedTop.__getValue()) /
                    HOUR_BLOCK_HEIGHT;
                  const endTime =
                    Math.floor(
                      scrollY.current +
                        // @ts-ignore
                        animatedTop.__getValue() +
                        // @ts-ignore
                        animatedHeight.__getValue()
                    ) / HOUR_BLOCK_HEIGHT;
                  props.onAddNewEvent(startTime, endTime);
                }}
              />
            </View>
            <EdgeResize
              animatedHeight={animatedHeight}
              animatedTop={animatedTop}
            />
            <EdgeResize animatedHeight={animatedHeight} />
          </Animated.View>
        </Fragment>
      )}
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    timelineContainer: {
      flex: 1,
    },
    event: {
      borderRadius: 4,
      padding: 8,
      opacity: 0.9,
    },
    eventTime: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.sm,
      color: theme.primary,
    },
    selectionLayer: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.5,
    },
    timelineWrapper: {
      flex: 1,
    },
    selectionBox: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderWidth: 1,
      borderRadius: Radius.xs,
      borderStyle: 'dashed',
      borderColor: theme.color3,
    },
    selectionBoxInside: {
      width: '100%',
      height: '100%',
    },
  });

export default React.memo(TimelineDay);
