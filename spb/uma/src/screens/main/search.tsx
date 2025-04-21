import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import NotFound from '@/components/common/NotFound';
import FilterButton from '@/components/search/FilterButton';
import FilterModal from '@/components/search/FilterModal';
import SearchBar from '@/components/search/Searchbar';
import SearchResult from '@/components/search/SearchResult';
import { DEFAULT_ICON_SIZE, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';
import { logError } from '@/helpers/logger';
import { deepClone } from '@/helpers/object';
import { buildSearchUnitQueryFromFilter } from '@/helpers/pagination';
import { MainStackParamList } from '@/screens/main';
import BackButton from '@/ui/button/Back';
import LeftArrowIcon from '@/ui/icon/LeftArrow';
import Loading from '@/ui/Loading';
import { initFilter, useLocationStore, useUnitStore } from '@/zustand';
import { RouteProp } from '@react-navigation/native';

type SearchProps = {
  route?: RouteProp<MainStackParamList, 'Search'>;
};

const SearchScreen: FC<SearchProps> = ({ route }) => {
  const showFilter = !!route?.params?.showFilter;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const [filterModalVisible, setFilterModalVisible] = useState(showFilter);

  const searchUnits = useUnitStore.use.searchUnits();
  const isLoading = useUnitStore.use.isLoading();
  const hasFilter = useUnitStore.use.hasFilter();
  const filter = useUnitStore.use.filter();
  const updateFilter = useUnitStore.use.updateFilter();
  const resetSearch = useUnitStore.use.resetSearch();
  const search = useUnitStore.use.search();
  const longitude = useLocationStore.use.longitude();
  const latitude = useLocationStore.use.latitude();
  const isLoadingMore = useUnitStore.use.isLoadingMore();
  const loadingMore = useUnitStore.use.loadingMore();
  const radius = useLocationStore.use.radius();

  const handleApplyFilter = () => {
    let additionParams;
    // Add location to the search query if nearby is selected
    if (filter.isNearby) {
      additionParams = {
        longitude: longitude,
        latitude: latitude,
        radius: radius,
      };
    }
    const unitQuerySearch = buildSearchUnitQueryFromFilter(
      filter,
      additionParams
    );
    search(unitQuerySearch, { longitude: longitude, latitude: latitude });
  };

  const handleLoadMore = () => {
    if (!isLoadingMore()) {
      return;
    }

    try {
      loadingMore({ longitude: longitude, latitude: latitude });
    } catch (error) {
      if (error instanceof Error) {
        logError(error as Error);
      }
    }
  };

  useEffect(() => {
    return () => {
      resetSearch();
      updateFilter(deepClone(initFilter));
    };
  }, [resetSearch, updateFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <BackButton
          icon={
            <LeftArrowIcon color={theme.icon} size={DEFAULT_ICON_SIZE + 4} />
          }
        />
        <SearchBar />
        <FilterButton
          onPress={() => setFilterModalVisible(true)}
          hasFilter={hasFilter()}
        />
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={handleApplyFilter}
        />
      </View>
      <View style={styles.searchBody}>
        {isLoading && searchUnits.length === 0 && <Loading />}
        {!isLoading && searchUnits.length === 0 && <NotFound />}
        {!isLoading && searchUnits.length > 0 && (
          <SearchResult
            unitCard={searchUnits}
            isLoadingMore={isLoadingMore()}
            onLoadMore={handleLoadMore}
          />
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundLight,
      flexDirection: 'column',
    },
    searchHeader: {
      width: '100%',
      paddingRight: hp(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchBody: {
      width: '100%',
      paddingHorizontal: hp(2),
      flex: 1,
      backgroundColor: theme.backgroundLight,
      flexDirection: 'column',
    },
  });

export default SearchScreen;
