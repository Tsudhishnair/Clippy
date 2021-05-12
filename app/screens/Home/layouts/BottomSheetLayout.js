import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';

export default function BottomSheetLayout(props) {
  const { showBottomSheet, setBottomSheet, actionFunctions } = props;

  const { setCollectionModal, setClipModal } = actionFunctions;

  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleCreateClipOnPress = () => {
    setBottomSheet(false);
    setActionAfterSheetClose({
      selectedFn: () => {
        setClipModal(true);
      },
    });
  };

  const handleCreateCollectionOnPress = () => {
    setBottomSheet(false);
    setActionAfterSheetClose({
      selectedFn: () => {
        setCollectionModal(true);
      },
    });
  };

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose}>
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
