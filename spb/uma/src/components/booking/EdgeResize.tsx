import React, { FC, useCallback, useContext, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { HOUR_BLOCK_HEIGHT } from 'react-native-calendars/src/timeline/Packer';

import { IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { wp } from '@/helpers/dimensions';

type Props = {
  animatedHeight: Animated.Value;
  animatedTop?: Animated.Value;
};

const EdgeResize: FC<Props> = ({ animatedHeight, animatedTop }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const snapSizePx = HOUR_BLOCK_HEIGHT / 2;

  const snapToInterval = useCallback((value: number) => {
    return Math.round(value / snapSizePx) * snapSizePx;
  }, []);

  const startHeight = useRef<number>(0);
  const startTop = useRef<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        animatedHeight.stopAnimation((value) => {
          startHeight.current = value;
        });
        if (animatedTop) {
          animatedTop.stopAnimation((value) => {
            startTop.current = value;
          });
        }
      },

      onPanResponderMove: (e, gestureState) => {
        if (!animatedTop) {
          const newHeight = startHeight.current + gestureState.dy;
          if (newHeight < snapSizePx) {
            return;
          }

          animatedHeight.setValue(newHeight);
        } else {
          const newHeight = startHeight.current - gestureState.dy;
          if (newHeight < snapSizePx) {
            return;
          }

          animatedHeight.setValue(newHeight);
          const newTop = startTop.current + gestureState.dy;
          animatedTop.setValue(newTop);
        }
      },

      onPanResponderRelease: () => {
        animatedHeight.flattenOffset();
        // @ts-ignore
        animatedHeight.setValue(snapToInterval(animatedHeight.__getValue()));

        if (animatedTop) {
          animatedTop.flattenOffset();
          // @ts-ignore
          const deltaY = animatedTop.__getValue() - startTop.current;
          console.log(deltaY);
          animatedTop.setValue(startTop.current + snapToInterval(deltaY));
        }
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.edgeResize,
        animatedTop && { top: 0, justifyContent: 'flex-start' },
        !animatedTop && { bottom: 0, justifyContent: 'flex-end' },
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.edgeBox,
          animatedTop && { marginLeft: wp(2), marginTop: -wp(1) },
          !animatedTop && { marginRight: wp(2), marginBottom: -wp(1) },
        ]}
      />
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    edgeResize: {
      height: 2,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      alignItems: 'center',
      zIndex: 10,
      flexDirection: 'row',
    },
    edgeBox: {
      width: wp(4),
      height: wp(4),
      backgroundColor: theme.color3,
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: theme.color3,
    },
  });

export default React.memo(EdgeResize);
