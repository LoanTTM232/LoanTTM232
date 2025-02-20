import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import { DEFAULT_ICON_SIZE, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme.context';
import { hp } from '@/helpers/dimensions';
import IconButton from '@/ui/button/IconButton';
import Search from '@/ui/search/Search';

const HomeScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <Search theme={theme} onSearch={() => {}} />
          <IconButton
            icon={
              <Feather
                name="sliders"
                size={DEFAULT_ICON_SIZE}
                color={theme.secondary}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: IColorScheme) => {
  return StyleSheet.create({
    safeView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundDark,
    },
    searchSection: {
      width: '100%',
      padding: hp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      gap: hp(2),
    },
    searchSectionIcon: {
      paddingHorizontal: hp(1),
    },
  });
};

export default HomeScreen;
