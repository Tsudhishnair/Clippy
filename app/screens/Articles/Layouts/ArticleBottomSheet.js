import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';
import { RootContext } from '../../../store/RootContext';

export default function ArticleBottomSheet({ id, setBottomSheet, showBottomSheet, actionFunctions }) {
  const { deleteClip } = useContext(RootContext);
  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleDeleteArticle = id => {
    deleteClip(id);
    setBottomSheet(!showBottomSheet);
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetContent}>
        <Button title={'Open in browser'} onPress={() => {}} color={colors.grey} />
        <Button title={'Mark as read'} onPress={() => {}} color={colors.grey} />
        <Button
          title={'Delete'}
          onPress={() => {
            handleDeleteArticle(id);
          }}
          color={colors.grey}
        />
      </View>
    );
  };

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose}>
      {bottomSheetContent()}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
