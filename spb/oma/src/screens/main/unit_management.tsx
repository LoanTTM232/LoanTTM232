import React, { FC, useContext, useState } from 'react';
import {
  Alert, FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { useShallow } from 'zustand/shallow';

import HeaderWithBack from '@/components/common/HeaderWithBack';
import UnitForm from '@/components/unit/UnitForm';
import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp, wp } from '@/helpers/dimensions';
import { dateTimeToStringTime } from '@/helpers/function';
import { UnitCard } from '@/services/types';
import { UnitModel } from '@/types/model';
import FloatButton from '@/ui/button/FloatButton';
import PlusIcon from '@/ui/icon/Plus';
import { useClubStore, useSportTypeStore } from '@/zustand';
import { PLACEHOLDER_IMAGE } from '@env';

const UnitManagementScreen: FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  // State for units data
  const units = useClubStore(useShallow((state) => state.club.units));
  const sportType = useSportTypeStore(useShallow((state) => state.sportType));

  // State for unit form modal
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<UnitModel | undefined>(
    undefined
  );

  // Handle add unit
  const handleAddUnit = () => {
    setShowUnitForm(true);
  };

  // Handle edit unit
  const handleEditUnit = (unit: UnitModel) => {
    setShowUnitForm(true);
  };

  // Handle save unit
  const handleSaveUnit = (unit: UnitModel) => {
    if (currentUnit) {
      // Update existing unit
      //   setUnits((prevUnits) =>
      //     prevUnits.map((u) => (u.id === unit.id ? unit : u))
      //   );
      Alert.alert('Success', 'Unit updated successfully');
    } else {
      // Add new unit
      //   setUnits((prevUnits) => [...prevUnits, unit]);
      Alert.alert('Success', 'Unit added successfully');
    }
    setShowUnitForm(false);
  };

  // Handle disable/enable unit
  const handleToggleUnitStatus = (unit: UnitModel) => {
    // In a real app, this would call an API to update the unit status
    Alert.alert(
      'Confirm',
      `Are you sure you want to ${unit.status === 1 ? 'disable' : 'enable'} this unit?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const updatedUnit = {
              ...unit,
              status: unit.status === 1 ? 0 : 1,
            };
            // setUnits((prevUnits) =>
            //   prevUnits.map((u) => (u.id === unit.id ? updatedUnit : u))
            // );
          },
        },
      ]
    );
  };

  // Render unit item
  const renderUnitItem = ({ item }: { item: UnitModel }) => {
    return (
      <ShadowedView style={styles.unitCard}>
        <View style={styles.unitHeader}>
          <View style={styles.unitTitleRow}>
            <Image
              source={{
                uri: item.media.length > 0 ? item.media[0].filePath : PLACEHOLDER_IMAGE,
              }}
              style={styles.unitImage}
            />
            <View style={styles.unitTitleContainer}>
              <Text style={styles.unitName}>{item.name}</Text>
              <Text style={styles.unitStatus}>
                {item.status === 1 ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
          <View style={styles.unitActions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditUnit(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <Switch
              value={item.status === 1}
              onValueChange={() => handleToggleUnitStatus(item)}
              trackColor={{ false: theme.disable, true: theme.primary }}
              thumbColor={theme.white}
            />
          </View>
        </View>
        <View style={styles.unitDetails}>
          <Text style={styles.unitDetail}>
            Open: {item.openTime} -{' '}
            {item.closeTime}
          </Text>
          <Text style={styles.unitDetail}>Phone: {item.phone}</Text>
          <Text style={styles.unitDetail}>
            Sport Types: {item.sportTypes.map((st) => st.name).join(', ')}
          </Text>
          <Text style={styles.unitDetail}>
            Services: {item.unitServices.length} | Prices: {item.unitPrices.length}
          </Text>
          <Text style={styles.unitAddress} numberOfLines={2}>
            Address: {item.address.address}
          </Text>
        </View>
      </ShadowedView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Unit Management" isClose={false} />

      <View style={styles.content}>
        {units.length > 0 && (
          <FlatList
            data={units}
            renderItem={renderUnitItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.unitList}
          />
        )}
      </View>

      {/* Floating Add Button */}
      {units.length > 0 && (
        <FloatButton
          icon={<PlusIcon color={theme.white} />}
          onPress={handleAddUnit}
        />
      )}

      {/* Unit Form Modal */}
      {currentUnit && (
        <UnitForm
          visible={showUnitForm}
          onClose={() => setShowUnitForm(false)}
          unit={currentUnit}
          sportTypes={sportType}
          onSave={handleSaveUnit}
          theme={theme}
        />
      )}
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
    },
    content: {
      flex: 1,
      padding: wp(4),
    },
    unitList: {
      paddingBottom: hp(2),
    },
    unitCard: {
      backgroundColor: theme.white,
      borderRadius: Radius.md,
      padding: wp(4),
      marginBottom: hp(2),
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 3,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    unitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: hp(1.5),
    },
    unitTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    unitImage: {
      width: wp(12),
      height: wp(12),
      borderRadius: Radius.xs,
      marginRight: wp(3),
    },
    unitTitleContainer: {
      flex: 1,
    },
    unitName: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.lg,
      color: theme.textDark,
    },
    unitStatus: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.primary,
      marginTop: hp(0.2),
    },
    unitActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.5),
      borderRadius: Radius.xs,
      marginRight: wp(3),
    },
    editButtonText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.white,
    },
    unitDetails: {
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
      paddingTop: hp(1.5),
    },
    unitDetail: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.sm,
      color: theme.textLight,
      marginBottom: hp(0.5),
    },
    unitAddress: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.sm,
      color: theme.textLight,
      marginTop: hp(0.5),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      ...fontFamily.RALEWAY_MEDIUM,
      fontSize: fontSize.md,
      color: theme.textLight,
      marginBottom: hp(2),
    },
    loadingText: {
      ...fontFamily.RALEWAY_MEDIUM,
      fontSize: fontSize.md,
      color: theme.textLight,
      textAlign: 'center',
      marginTop: hp(10),
    },
    addUnitButton: {
      width: wp(40),
    },
  });

export default UnitManagementScreen;
