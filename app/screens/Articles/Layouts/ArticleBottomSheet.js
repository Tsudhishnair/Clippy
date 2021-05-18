import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert, Linking } from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';
import { ModalContext } from '../../../store/ModalContext';
import { RootContext } from '../../../store/RootContext';

export default function ArticleBottomSheet({ selectedArticle }) {
  const { deleteClip, markAsRead } = useContext(RootContext);
  const { showBottomSheet, setBottomSheet, showCreateOrEditClipModal, setCreateOrEditClipModal } = useContext(ModalContext);
  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleDeleteArticle = id => {
    deleteClip(id);
    setBottomSheet(!showBottomSheet);
  };

  const handleEdit = () => {
    setActionAfterSheetClose({
      selectedFn: () => {
        setCreateOrEditClipModal(!showCreateOrEditClipModal);
      },
    });
    setBottomSheet(!showBottomSheet);
  };

  const handleMarkAsRead = id => {
    markAsRead(id);
    setBottomSheet(!showBottomSheet);
  };

  const resetFns = () => {
    setActionAfterSheetClose({ selectedFn: null });
  };

  const openUrl = async url => {
    try {
      const canOpenTheSpecifiedUrl = await Linking.canOpenURL(url);
      if (canOpenTheSpecifiedUrl) {
        await Linking.openURL(url);
        setBottomSheet(!showBottomSheet);
      } else {
        Alert.alert('Something unexpected occurred.', `Cannot open this url: ${url}`);
      }
    } catch (err) {
      Alert('Something unexpected occurred.', err);
    }
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetContent}>
        <Button
          title={'Open in browser'}
          onPress={() => {
            openUrl(selectedArticle.url);
          }}
          color={colors.grey}
        />
        <Button
          title={'Mark as read'}
          onPress={() => {
            handleMarkAsRead(selectedArticle.id);
          }}
          color={colors.grey}
        />
        <Button
          title={'Edit'}
          onPress={() => {
            handleEdit();
          }}
          color={colors.grey}
        />
        <Button
          title={'Delete'}
          onPress={() => {
            handleDeleteArticle(selectedArticle.id);
          }}
          color={colors.grey}
        />
      </View>
    );
  };

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose} resetFns={resetFns}>
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
