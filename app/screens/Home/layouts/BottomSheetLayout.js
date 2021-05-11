import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import colors from '../../../constants/colors';

export default function BottomSheetLayout(props) {
  const { showBottomSheet, setBottomSheet } = props;

  return (
    <BottomSheet showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet}>
      <View style={styles.container}>
        <Button title={'Create a clip'} onPress={() => {}} color={colors.grey} />
        <Button title={'Create a collection'} onPress={() => {}} color={colors.grey} />
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
