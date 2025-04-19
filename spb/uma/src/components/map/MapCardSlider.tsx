import React, { Children, FC, ReactNode } from 'react';
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import PagerView from 'react-native-pager-view';

import { hp } from '@/helpers/dimensions';

interface MapCardSliderProps {
  children: ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  initialPage?: number;
  onPageSelected?: (position: number) => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SIDE_SPACE = Math.round((width - ITEM_WIDTH) / 2);

const MapCardSlider: FC<MapCardSliderProps> = ({
  children,
  containerStyles,
  initialPage = 0,
  onPageSelected,
}) => {
  const childrenArray = Children.toArray(children);

  const handlePageSelected = (e: any) => {
    const position = Math.round(e.nativeEvent.position);
    onPageSelected?.(position);
  };

  if (!childrenArray.length) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyles]}>
      <PagerView
        style={styles.pager}
        initialPage={initialPage}
        onPageSelected={handlePageSelected}
        orientation="horizontal"
        overdrag={false}
        scrollEnabled={true}
        pageMargin={-SIDE_SPACE * 3}
        offscreenPageLimit={3}
      >
        {childrenArray.map((child, index) => (
          <View key={index} style={styles.page}>
            {child}
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
	marginHorizontal: -SIDE_SPACE,
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  pager: {
	width: width + SIDE_SPACE * 2,
    height: '100%',
  },
  page: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapCardSlider;
