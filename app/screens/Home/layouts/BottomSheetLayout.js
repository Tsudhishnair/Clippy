import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import { GlobalStyle } from '../../../constants/GlobalStyle';
import colors from '../../../constants/colors';
import { ModalContext } from '../../../store/ModalContext';

export default function BottomSheetLayout() {
  const { showBottomSheet, setBottomSheet, setCreateOrEditClipModal, setCreateOrEditCollectionModal } = useContext(ModalContext);
  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleCreateClipOnPress = () => {
    setBottomSheet(false);
    setActionAfterSheetClose({
      selectedFn: () => {
        setCreateOrEditClipModal(true);
      },
    });
  };

  const handleCreateCollectionOnPress = () => {
    setBottomSheet(false);
    setActionAfterSheetClose({
      selectedFn: () => {
        setCreateOrEditCollectionModal(true);
      },
    });
  };

  const resetFns = () => {
    setActionAfterSheetClose({ selectedFn: null });
  };

  const customButton = (actionFn, buttonText) => {
    return (
      <TouchableOpacity onPress={actionFn}>
        <View style={styles.customButton}>
          <Text style={[GlobalStyle.text, styles.buttonText]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose} resetFns={resetFns}>
      <View style={styles.container}>
        {customButton(() => {
          handleCreateClipOnPress();
        }, 'Create a clip')}
        {customButton(() => {
          handleCreateCollectionOnPress();
        }, 'Create a collection')}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  customButton: {
    padding: 5,
  },
  buttonText: {
    color: colors.grey,
  },
});
