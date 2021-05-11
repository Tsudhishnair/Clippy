import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

function BottomSheet(props) {
  const { showBottomSheet, setBottomSheet } = props;
  const closeSheet = () => {
    setBottomSheet(false);
  };

  return (
    <Modal
      isVisible={showBottomSheet}
      onSwipeComplete={closeSheet}
      onBackdropPress={closeSheet}
      swipeDirection={'down'}
      style={styles.swipeSheet}>
      <View style={styles.body}>{props.children}</View>
    </Modal>
  );
}

export default BottomSheet;
const styles = StyleSheet.create({
  swipeSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  body: {
    backgroundColor: '#fff',
    height: '15%',
  },
});
