import React, { useCallback, useContext, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import SearchCard from '@/components/search/SearchCard';
import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';
import { logError } from '@/helpers/logger';
import { buildSearchUnitQueryFromFilter } from '@/helpers/pagination';
import { UnitCard } from '@/services/types';
import Loading from '@/ui/Loading';
import { useLocationStore, useUnitStore } from '@/zustand';

type Props = {
  unitCard: UnitCard[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
};

const SearchResult: React.FC<Props> = ({
  unitCard,
  onLoadMore,
  isLoadingMore,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const [refreshing, setRefreshing] = useState(false);

  const search = useUnitStore.use.search();
  const filter = useUnitStore.use.filter();
  const longitude = useLocationStore.use.longitude();
  const latitude = useLocationStore.use.latitude();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      const unitQuerySearch = buildSearchUnitQueryFromFilter(filter);
      search(unitQuerySearch, { longitude: longitude, latitude: latitude });
    } catch (error) {
      logError(error as Error);
    } finally {
      setRefreshing(false);
    }
  }, [filter, search, longitude, latitude]);

  const renderItem = ({ item }: { item: UnitCard }) => (
    <SearchCard unitCard={item} onPress={() => {}} onPressLocation={() => {}} />
  );

  return (
    <FlatList
      data={unitCard}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.2}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.primary}
        />
      }
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={isLoadingMore ? <Loading /> : null}
    />
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    content: {
      paddingBottom: hp(1),
    },
    loading: {
      textAlign: 'center',
      paddingVertical: hp(1),
      color: theme.textLight,
    },
  });

export default SearchResult;
