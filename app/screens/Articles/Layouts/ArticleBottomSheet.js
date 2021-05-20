import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, Linking, TouchableOpacity, Text } from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';
import { ModalContext } from '../../../store/ModalContext';
import { RootContext } from '../../../store/RootContext';
import { GlobalStyle } from '../../../constants/GlobalStyle';

export default function ArticleBottomSheet({ selectedArticle, setToast }) {
  const { deleteClip, markAsRead } = useContext(RootContext);
  const { showBottomSheet, setBottomSheet, showCreateOrEditClipModal, setCreateOrEditClipModal } = useContext(ModalContext);
  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleDeleteArticle = id => {
    deleteClip(id);
    setBottomSheet(!showBottomSheet);
    setToast({ type: 'success', message: 'Clip deleted successfully.', showToast: true });
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

  const customButton = (actionFn, buttonText) => {
    return (
      <TouchableOpacity onPress={actionFn}>
        <View style={styles.customButton}>
          <Text style={[GlobalStyle.text, styles.buttonText]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetContent}>
        {customButton(() => {
          openUrl(selectedArticle.url);
        }, 'Open in browser')}
        {customButton(() => {
          handleMarkAsRead(selectedArticle.id);
        }, 'Mark as read')}
        {customButton(() => {
          handleEdit();
        }, 'Edit')}
        {customButton(() => {
          handleDeleteArticle(selectedArticle.id);
        }, 'Delete')}
      </View>
    );
  };

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actions={actionAfterSheetClose} resetFns={resetFns}>
      <View style={styles.bottomSheetContent}>{bottomSheetContent()}</View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
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
