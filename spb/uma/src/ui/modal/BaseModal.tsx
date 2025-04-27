import React, { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';

export interface IInformModalProps {
  visible: boolean;
  onClose: () => void;
}

const BaseModal: FC<PropsWithChildren<IInformModalProps>> = ({
  visible,
  onClose,
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <Modal
      animationType="slide"
	  hardwareAccelerated={true}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.overlay,
    },
    content: {
      flex: 1,
      width: '100%',
	  height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

export default BaseModal;
