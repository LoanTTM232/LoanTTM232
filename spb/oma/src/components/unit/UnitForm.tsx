import { Feature, Point } from 'geojson';
import React, { FC, useState } from 'react';
import {
  FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { launchImageLibrary } from 'react-native-image-picker';

import { fontFamily, fontSize, IColorScheme, Radius } from '@/constants';
import { hp, wp } from '@/helpers/dimensions';
import { logError } from '@/helpers/logger';
import { toastError, toastSuccess } from '@/helpers/toast';
import mediaService, { RNImageFile } from '@/services/media.service';
import {
  MediaModel, SportTypeModel, UnitModel, UnitPriceModel, UnitServiceModel
} from '@/types/model';
import Button from '@/ui/button/BaseButton';
import Dropdown from '@/ui/dropdown/Dropdown';
import CloseIcon from '@/ui/icon/Close';
import BaseModal from '@/ui/modal/BaseModal';
import { useClubStore, useLocationStore } from '@/zustand';
import { PLACEHOLDER_IMAGE } from '@env';

import MapView from '../common/MapView';

interface UnitFormProps {
  visible: boolean;
  onClose: () => void;
  unit: UnitModel;
  sportTypes: SportTypeModel[];
  onSave: (unit: UnitModel) => void;
  theme: IColorScheme;
}

const UnitForm: FC<UnitFormProps> = ({
  visible,
  onClose,
  unit,
  sportTypes,
  onSave,
  theme,
}) => {
  const styles = createStyles(theme);

  const provinces = useLocationStore((state) => state.province);
  const districts = useLocationStore((state) => state.district);
  const wards = useLocationStore((state) => state.ward);
  const getDistrict = useLocationStore((state) => state.getDistrict);
  const getWard = useLocationStore((state) => state.getWard);
  const addMediaToUnit = useClubStore((state) => state.addMediaToUnit);

  // State for unit data
  const [unitData, setUnitData] = useState<UnitModel>(unit);

  // State for scroll control
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Address selection state
  const [selectedProvince, setSelectedProvince] = useState<string>(
    unit.address.provinceId || ''
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    unit.address.districtId || ''
  );
  const [selectedWard, setSelectedWard] = useState<string>(
    unit.address.wardId || ''
  );

  // State for price form
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<UnitPriceModel>({
    id: '',
    price: 0,
    currency: 'VND',
    startTime: '',
    endTime: '',
  });

  // State for service form
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentService, setCurrentService] = useState<UnitServiceModel>({
    id: '',
    name: '',
    icon: '',
    description: '',
    price: 0,
    currency: 'VND',
    status: 1,
  });

  // Handle update unit field
  const handleUpdateUnitField = (field: keyof UnitModel, value: any) => {
    setUnitData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle update address field
  const handleUpdateAddressField = (field: string, value: string) => {
    setUnitData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
  };

  // Handle toggle sport type
  const handleToggleSportType = (sportType: SportTypeModel) => {
    const isSelected = unitData.sportTypes.some((st) => st.id === sportType.id);

    if (isSelected) {
      // Remove sport type
      setUnitData((prevData) => ({
        ...prevData,
        sportTypes: prevData.sportTypes.filter((st) => st.id !== sportType.id),
      }));
    } else {
      // Add sport type
      setUnitData((prevData) => ({
        ...prevData,
        sportTypes: [...prevData.sportTypes, sportType],
      }));
    }
  };

  // Handle add price
  const handleAddPrice = () => {
    if (currentPrice.id) {
      // Update existing price
      setUnitData({
        ...unitData,
        unitPrices: unitData.unitPrices.map((p) =>
          p.id === currentPrice.id ? currentPrice : p
        ),
      });
    } else {
      // Add new price
      const newPrice = {
        ...currentPrice,
        id: Date.now().toString(),
      };
      setUnitData({
        ...unitData,
        unitPrices: [...unitData.unitPrices, newPrice],
      });
    }

    // Reset form
    setCurrentPrice({
      id: '',
      price: 0,
      currency: 'VND',
      startTime: '',
      endTime: '',
    });
    setShowPriceForm(false);
  };

  // Handle edit price
  const handleEditPrice = (price: UnitPriceModel) => {
    setCurrentPrice(price);
    setShowPriceForm(true);
  };

  // Handle delete price
  const handleDeletePrice = (id: string) => {
    setUnitData({
      ...unitData,
      unitPrices: unitData.unitPrices.filter((p) => p.id !== id),
    });
  };

  // Handle add service
  const handleAddService = () => {
    if (currentService.id) {
      // Update existing service
      setUnitData({
        ...unitData,
        unitServices: unitData.unitServices.map((s) =>
          s.id === currentService.id ? currentService : s
        ),
      });
    } else {
      // Add new service
      const newService = {
        ...currentService,
        id: Date.now().toString(),
      };
      setUnitData({
        ...unitData,
        unitServices: [...unitData.unitServices, newService],
      });
    }

    // Reset form
    setCurrentService({
      id: '',
      name: '',
      icon: '',
      description: '',
      price: 0,
      currency: 'VND',
      status: 1,
    });
    setShowServiceForm(false);
  };

  // Handle edit service
  const handleEditService = (service: UnitServiceModel) => {
    setCurrentService(service);
    setShowServiceForm(true);
  };

  // Handle delete service
  const handleDeleteService = (id: string) => {
    setUnitData({
      ...unitData,
      unitServices: unitData.unitServices.filter((s) => s.id !== id),
    });
  };

  // Handle province selection
  const handleProvinceSelect = (provinceId: string) => {
    const province = provinces.find((p) => p.id === provinceId);

    setSelectedProvince(provinceId);
    setSelectedDistrict('');
    setSelectedWard('');

    // Update unit address with province info
    setUnitData((prevUnit) => ({
      ...prevUnit,
      address: {
        ...prevUnit.address,
        province: province?.name || '',
        provinceId: provinceId,
        district: '',
        districtId: '',
        ward: '',
        wardId: '',
      },
    }));

    // Fetch districts for the selected province
    getDistrict(provinceId);
  };

  // Handle district selection
  const handleDistrictSelect = (districtId: string) => {
    const district = districts.find((d) => d.id === districtId);

    setSelectedDistrict(districtId);
    setSelectedWard('');

    // Update unit address with district info
    setUnitData((prevUnit) => ({
      ...prevUnit,
      address: {
        ...prevUnit.address,
        district: district?.name || '',
        districtCode: districtId,
        ward: '',
        wardCode: '',
      },
    }));

    // Fetch wards for the selected district
    getWard(districtId);
  };

  // Handle ward selection
  const handleWardSelect = (wardId: string) => {
    const ward = wards.find((w) => w.id === wardId);

    setSelectedWard(wardId);

    // Update unit address with ward info
    setUnitData((prevUnit) => ({
      ...prevUnit,
      address: {
        ...prevUnit.address,
        ward: ward?.name || '',
        wardCode: wardId,
      },
    }));
  };

  // Handle add image
  const handleAddImage = async () => {
    try {
      // Launch image picker
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel || !result.assets || result.assets.length === 0) {
        return;
      }

      const selectedImage = result.assets[0];
      // Create file object from URI
      const fileToUpload: RNImageFile = {
        uri: selectedImage.uri || PLACEHOLDER_IMAGE,
        type: selectedImage.type || 'image/jpeg',
        name: selectedImage.fileName || `image_${Date.now()}.jpg`,
      };

      // Upload image
      const response = await mediaService.upload(fileToUpload);
      if (response instanceof Error) {
        throw response;
      }

      // Add uploaded image to unit media
      const newMedia = response.data;
      const mediaId = await addMediaToUnit(unit.id, newMedia);
      setUnitData({
        ...unitData,
        media: [...unitData.media, { ...newMedia, mediaId }],
      });
    } catch (error) {
      logError(error as Error);
      toastError('Failed to upload image');
    }
  };

  // Handle delete image
  const handleDeleteImage = async (id: string) => {
    try {
      // First try to remove the image from the server
      const response = await mediaService.removeMediaFromUnit(id);
      if (response instanceof Error) {
        throw response;
      }

      // Then remove it from the local state
      setUnitData({
        ...unitData,
        media: unitData.media.filter((img) => img.mediaId !== id),
      });

      toastSuccess('Image removed successfully');
    } catch (error) {
      logError(error as Error);
      toastError('Failed to remove image');

      // Still remove from local state even if server removal fails
      setUnitData({
        ...unitData,
        media: unitData.media.filter((img) => img.mediaId !== id),
      });
    }
  };

  // Save unit
  const handleSave = () => {
    // Ensure address information is properly included
    const finalUnitData = {
      ...unitData,
      address: {
        ...unitData.address,
        provinceCode: selectedProvince,
        districtCode: selectedDistrict,
        wardCode: selectedWard,
      },
    };

    onSave(finalUnitData);
    onClose();
    toastSuccess('Unit saved successfully');
  };

  const handleMapTouchStart = () => {
    setScrollEnabled(false);
  };

  const handleOutsideMapTouch = () => {
    setScrollEnabled(true);
  };

  const handleLocationChange = (feature: Feature) => {
    if (feature.geometry.type === 'Point') {
      const coords = (feature.geometry as Point).coordinates;
      setUnitData((prevUnit) => ({
        ...prevUnit,
        address: {
          ...prevUnit.address,
          locationGeography: {
            latitude: coords[1],
            longitude: coords[0],
          },
        },
      }));
    }
  };

  // Render sport type item
  const renderSportTypeItem = ({ item }: { item: SportTypeModel }) => {
    const isSelected = unitData.sportTypes.some((st) => st.id === item.id);

    return (
      <TouchableOpacity
        style={[
          styles.sportTypeItem,
          isSelected && styles.sportTypeItemSelected,
        ]}
        onPress={() => handleToggleSportType(item)}
      >
        <Text
          style={[
            styles.sportTypeText,
            isSelected && styles.sportTypeTextSelected,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render price item
  const renderPriceItem = ({ item }: { item: UnitPriceModel }) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>
            {item.startTime} - {item.endTime}
          </Text>
          <Text style={styles.itemSubtitle}>
            {item.price.toLocaleString()} {item.currency}
          </Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.editItemButton}
            onPress={() => handleEditPrice(item)}
          >
            <Text style={styles.editItemText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteItemButton}
            onPress={() => handleDeletePrice(item.id)}
          >
            <Text style={styles.deleteItemText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render service item
  const renderServiceItem = ({ item }: { item: UnitServiceModel }) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>
            {item.price.toLocaleString()} {item.currency}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.editItemButton}
            onPress={() => handleEditService(item)}
          >
            <Text style={styles.editItemText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteItemButton}
            onPress={() => handleDeleteService(item.id)}
          >
            <Text style={styles.deleteItemText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render image item
  const renderImageItem = ({ item }: { item: MediaModel }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.filePath }} style={styles.image} />
        <TouchableOpacity
          style={styles.deleteImageButton}
          onPress={() => handleDeleteImage(item.mediaId)}
        >
          <Text style={styles.deleteImageText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ShadowedView style={styles.header}>
          <Text style={styles.title}>{unit ? 'Edit Unit' : 'Add Unit'}</Text>
          <Pressable onPress={onClose}>
            <CloseIcon color={theme.icon} />
          </Pressable>
        </ShadowedView>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
        >
          {/* Basic Information */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <View style={styles.formField}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={unitData.name}
                onChangeText={(text) => handleUpdateUnitField('name', text)}
                placeholder="Unit name"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formField, styles.halfWidth]}>
                <Text style={styles.label}>Open Time</Text>
                <TextInput
                  style={styles.input}
                  value={unitData.openTime}
                  onChangeText={(text) =>
                    handleUpdateUnitField('openTime', text)
                  }
                  placeholder="HH:MM"
                />
              </View>

              <View style={[styles.formField, styles.halfWidth]}>
                <Text style={styles.label}>Close Time</Text>
                <TextInput
                  style={styles.input}
                  value={unitData.closeTime}
                  onChangeText={(text) =>
                    handleUpdateUnitField('closeTime', text)
                  }
                  placeholder="HH:MM"
                />
              </View>
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={unitData.phone}
                onChangeText={(text) => handleUpdateUnitField('phone', text)}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={unitData.description}
                onChangeText={(text) =>
                  handleUpdateUnitField('description', text)
                }
                placeholder="Description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <Text style={styles.sectionTitle}>Address</Text>

            <View style={styles.formField}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={unitData.address.address}
                onChangeText={(text) =>
                  handleUpdateAddressField('address', text)
                }
                placeholder="Street address"
              />
            </View>

            {/* Province Dropdown */}
            <View style={styles.formField}>
              <Text style={styles.label}>Province</Text>
              <Dropdown
                value={selectedProvince}
                items={provinces.map((province) => ({
                  label: province.name,
                  value: province.id,
                }))}
                onSelect={handleProvinceSelect}
                placeholder="Select Province"
                containerStyle={styles.dropdown}
              />
            </View>

            {/* District Dropdown */}
            <View style={styles.formField}>
              <Text style={styles.label}>District</Text>
              <Dropdown
                value={selectedDistrict}
                items={districts.map((district) => ({
                  label: district.name,
                  value: district.id,
                }))}
                onSelect={handleDistrictSelect}
                placeholder="Select District"
                containerStyle={styles.dropdown}
                disabled={!selectedProvince}
              />
            </View>

            {/* Ward Dropdown */}
            <View style={styles.formField}>
              <Text style={styles.label}>Ward</Text>
              <Dropdown
                value={selectedWard}
                items={wards.map((ward) => ({
                  label: ward.name,
                  value: ward.id,
                }))}
                onSelect={handleWardSelect}
                placeholder="Select Ward"
                containerStyle={styles.dropdown}
                disabled={!selectedDistrict}
              />
            </View>
          </View>

          {/* Map View */}
          <View style={styles.mapContainer} onTouchStart={handleOutsideMapTouch}>
            <MapView
              scrollEnabled={true}
              onMapTouchStart={handleMapTouchStart}
              coordinates={unitData.address.locationGeography}
              onMapPress={handleLocationChange}
              height={hp(30)}
            />
          </View>

          {/* Sport Types */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <Text style={styles.sectionTitle}>Sport Types</Text>
            <Text style={styles.sectionDescription}>
              Select all sport types available at this unit
            </Text>

            <FlatList
              data={sportTypes}
              renderItem={renderSportTypeItem}
              keyExtractor={(item) => item.id}
              horizontal={false}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.sportTypeList}
            />
          </View>

          {/* Images */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <Text style={styles.sectionTitle}>Images</Text>

            <FlatList
              data={unitData.media}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.mediaId}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageList}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.addImageButton}
                  onPress={handleAddImage}
                >
                  <Text style={styles.addImageText}>+</Text>
                </TouchableOpacity>
              }
            />
          </View>

          {/* Unit Prices */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Prices</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setCurrentPrice({
                    id: '',
                    price: 0,
                    currency: 'VND',
                    startTime: '',
                    endTime: '',
                  });
                  setShowPriceForm(true);
                }}
              >
                <Text style={styles.addButtonText}>+ Add Price</Text>
              </TouchableOpacity>
            </View>

            {unitData.unitPrices.length > 0 ? (
              <FlatList
                data={unitData.unitPrices}
                renderItem={renderPriceItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.itemList}
              />
            ) : (
              <Text style={styles.emptyText}>No prices added yet</Text>
            )}
          </View>

          {/* Unit Services */}
          <View style={styles.section} onTouchStart={handleOutsideMapTouch}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Services</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setCurrentService({
                    id: '',
                    name: '',
                    description: '',
                    price: 0,
                    currency: 'VND',
                    status: 1,
                    icon: '',
                  });
                  setShowServiceForm(true);
                }}
              >
                <Text style={styles.addButtonText}>+ Add Service</Text>
              </TouchableOpacity>
            </View>

            {unitData.unitServices.length > 0 ? (
              <FlatList
                data={unitData.unitServices}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.itemList}
              />
            ) : (
              <Text style={styles.emptyText}>No services added yet</Text>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer} onTouchStart={handleOutsideMapTouch}>
            <Button
              title="Cancel"
              onPress={onClose}
              buttonStyle={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
            <Button
              title="Save"
              onPress={handleSave}
              buttonStyle={styles.saveButton}
            />
          </View>
        </ScrollView>
      </View>

      {/* Price Form Modal */}
      <BaseModal
        visible={showPriceForm}
        onClose={() => setShowPriceForm(false)}
      >
        <View style={styles.formModal}>
          <Text style={styles.formModalTitle}>
            {currentPrice.id ? 'Edit Price' : 'Add Price'}
          </Text>

          <View style={styles.formRow}>
            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>Start Time</Text>
              <TextInput
                style={styles.input}
                value={currentPrice.startTime}
                onChangeText={(text) =>
                  setCurrentPrice({ ...currentPrice, startTime: text })
                }
                placeholder="HH:MM"
              />
            </View>

            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>End Time</Text>
              <TextInput
                style={styles.input}
                value={currentPrice.endTime}
                onChangeText={(text) =>
                  setCurrentPrice({ ...currentPrice, endTime: text })
                }
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={currentPrice.price.toString()}
                onChangeText={(text) =>
                  setCurrentPrice({
                    ...currentPrice,
                    price: parseFloat(text) || 0,
                  })
                }
                placeholder="Price"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>Currency</Text>
              <TextInput
                style={styles.input}
                value={currentPrice.currency}
                onChangeText={(text) =>
                  setCurrentPrice({ ...currentPrice, currency: text })
                }
                placeholder="Currency"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => setShowPriceForm(false)}
              buttonStyle={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
            <Button
              title="Save"
              onPress={handleAddPrice}
              buttonStyle={styles.saveButton}
            />
          </View>
        </View>
      </BaseModal>

      {/* Service Form Modal */}
      <BaseModal
        visible={showServiceForm}
        onClose={() => setShowServiceForm(false)}
      >
        <View style={styles.formModal}>
          <Text style={styles.formModalTitle}>
            {currentService.id ? 'Edit Service' : 'Add Service'}
          </Text>

          <View style={styles.formField}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={currentService.name}
              onChangeText={(text) =>
                setCurrentService({ ...currentService, name: text })
              }
              placeholder="Service name"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={currentService.description}
              onChangeText={(text) =>
                setCurrentService({ ...currentService, description: text })
              }
              placeholder="Description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={currentService.price.toString()}
                onChangeText={(text) =>
                  setCurrentService({
                    ...currentService,
                    price: parseFloat(text) || 0,
                  })
                }
                placeholder="Price"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formField, styles.halfWidth]}>
              <Text style={styles.label}>Currency</Text>
              <TextInput
                style={styles.input}
                value={currentService.currency}
                onChangeText={(text) =>
                  setCurrentService({ ...currentService, currency: text })
                }
                placeholder="Currency"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => setShowServiceForm(false)}
              buttonStyle={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
            <Button
              title="Save"
              onPress={handleAddService}
              buttonStyle={styles.saveButton}
            />
          </View>
        </View>
      </BaseModal>
    </BaseModal>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundLight,
      borderTopLeftRadius: Radius.lg,
      borderTopRightRadius: Radius.lg,
      height: '90%',
      width: '100%',
      padding: wp(5),
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.backgroundLight,
      justifyContent: 'space-between',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      marginBottom: hp(2),
    },
    title: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.xl,
      color: theme.textDark,
      marginBottom: hp(2),
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: hp(5),
    },
    section: {
      marginBottom: hp(3),
    },
    sectionTitle: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.md,
      color: theme.textDark,
      marginBottom: hp(1),
    },
    sectionDescription: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.xs,
      color: theme.textLight,
      marginBottom: hp(1),
    },
    addImageButton: {
      width: wp(25),
      height: wp(25),
      borderRadius: Radius.xs,
      borderWidth: 1,
      borderColor: theme.borderLight,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundLight,
    },
    addImageText: {
      fontSize: fontSize.xl,
      color: theme.textLight,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(1),
    },
    formField: {
      marginBottom: hp(2),
    },
    formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: hp(2),
    },
    halfWidth: {
      width: '48%',
    },
    label: {
      ...fontFamily.RALEWAY_MEDIUM,
      fontSize: fontSize.sm,
      color: theme.textDark,
      marginBottom: hp(0.5),
    },
    input: {
      height: hp(6),
      borderWidth: 1,
      borderColor: theme.borderLight,
      borderRadius: Radius.xs,
      paddingHorizontal: wp(3),
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.sm,
      color: theme.textDark,
      backgroundColor: theme.white,
    },
    textArea: {
      height: hp(12),
      paddingTop: hp(1),
      textAlignVertical: 'top',
    },
    sportTypeList: {
      flexDirection: 'row',
      marginTop: hp(1),
    },
    sportTypeItem: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.borderLight,
      borderRadius: Radius.xs,
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      marginRight: wp(2),
      marginBottom: hp(1),
    },
    sportTypeItemSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    sportTypeText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.textDark,
    },
    sportTypeTextSelected: {
      color: theme.white,
    },
    addButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.5),
      borderRadius: Radius.xs,
    },
    addButtonText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.white,
    },
    emptyText: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.sm,
      color: theme.textLight,
      marginTop: hp(1),
      marginBottom: hp(1),
    },
    imageList: {
      marginTop: hp(1),
    },
    imageContainer: {
      width: wp(25),
      height: wp(25),
      marginRight: wp(2),
      borderRadius: Radius.xs,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    deleteImageButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: theme.error,
      width: wp(5),
      height: wp(5),
      borderRadius: Radius.full,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteImageText: {
      ...fontFamily.POPPINS_BOLD,
      fontSize: fontSize.xs,
      color: theme.white,
    },
    itemList: {
      marginTop: hp(1),
    },
    itemCard: {
      backgroundColor: theme.white,
      borderRadius: Radius.xs,
      padding: wp(3),
      marginBottom: hp(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    itemContent: {
      flex: 1,
    },
    itemTitle: {
      ...fontFamily.RALEWAY_MEDIUM,
      fontSize: fontSize.sm,
      color: theme.textDark,
    },
    itemSubtitle: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.primary,
      marginTop: hp(0.5),
    },
    itemDescription: {
      ...fontFamily.POPPINS_REGULAR,
      fontSize: fontSize.xs,
      color: theme.textLight,
      marginTop: hp(0.5),
    },
    itemActions: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: hp(1),
    },
    editItemButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: wp(2),
      paddingVertical: hp(0.3),
      borderRadius: Radius.xs,
    },
    editItemText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.white,
    },
    deleteItemButton: {
      backgroundColor: theme.error,
      paddingHorizontal: wp(2),
      paddingVertical: hp(0.3),
      borderRadius: Radius.xs,
    },
    deleteItemText: {
      ...fontFamily.POPPINS_MEDIUM,
      fontSize: fontSize.xs,
      color: theme.white,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(2),
      width: '100%',
    },
    cancelButton: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.borderLight,
      width: wp(40),
    },
    cancelButtonText: {
      color: theme.textDark,
    },
    saveButton: {
      width: wp(40),
    },
    formModal: {
      backgroundColor: theme.backgroundLight,
      borderTopLeftRadius: Radius.lg,
      borderTopRightRadius: Radius.lg,
      padding: wp(5),
      width: '100%',
    },
    formModalTitle: {
      ...fontFamily.RALEWAY_BOLD,
      fontSize: fontSize.lg,
      color: theme.textDark,
      marginBottom: hp(2),
    },
    dropdown: {
      marginBottom: hp(1),
    },
    mapContainer: {
      marginHorizontal: wp(4),
      marginVertical: hp(2),
      borderRadius: Radius.md,
      overflow: 'hidden',
    },
  });

export default UnitForm;
