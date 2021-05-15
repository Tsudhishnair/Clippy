import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert, Linking } from 'react-native';

import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';
import { RootContext } from '../../../store/RootContext';

export default function ArticleBottomSheet({ selectedArticle, setBottomSheet, showBottomSheet, actionFunctions }) {
  const { deleteClip } = useContext(RootContext);
  const [actionAfterSheetClose, setActionAfterSheetClose] = useState({ selectedFn: null });

  const handleDeleteArticle = id => {
    deleteClip(id);
    setBottomSheet(!showBottomSheet);
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
        <Button title={'Mark as read'} onPress={() => {}} color={colors.grey} />
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
