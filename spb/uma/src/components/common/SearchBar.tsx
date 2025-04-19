import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Search from '@/ui/search/Search';

interface SearchBarProps {
  onSearch: (text: string) => void;
  containerStyles?: StyleProp<ViewStyle>;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, containerStyles }) => {
  const styles = createStyles();

  return (
    <View style={[styles.container, containerStyles]}>
      <Search onSearch={onSearch} />
    </View>
  );
};
const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
    },
  });
export default SearchBar;
