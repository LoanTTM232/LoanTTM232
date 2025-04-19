import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import SliderItem from '@/ui/slider/SliderItem';

type RenderItemProps<T> = {
  item: T;
  index: number;
};

type SliderProps<T> = {
  data: T[];
  containerStyle: StyleProp<ViewStyle>;
  width: number;
  initialScrollIndex?: number;
  renderItem: FC<RenderItemProps<T>>;
  onSlideSelected: (index: number) => void;
};

function Slider<T>({
  data,
  containerStyle,
  width,
  renderItem,
  initialScrollIndex = 0,
  onSlideSelected,
}: SliderProps<T>) {
  const scrollX = useSharedValue(6);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem index={index} scrollX={scrollX} width={width}>
            {renderItem({ item, index })}
          </SliderItem>
        )}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={3}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        removeClippedSubviews={false}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const selectedIndex = Math.round(offsetX / width);
          onSlideSelected(selectedIndex);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
});

export default Slider;
