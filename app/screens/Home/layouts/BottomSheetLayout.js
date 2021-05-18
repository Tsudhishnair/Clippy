import React, { useState, useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';

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

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose} resetFns={resetFns}>
      <View style={styles.container}>
        <Button
          title={'Create a clip'}
          onPress={() => {
            handleCreateClipOnPress();
          }}
          color={colors.grey}
        />
        <Button
          title={'Create a collection'}
          onPress={() => {
            handleCreateCollectionOnPress();
          }}
          color={colors.grey}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
