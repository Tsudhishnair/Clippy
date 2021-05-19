import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import colors from '../constants/colors';
import { GlobalStyle } from '../constants/GlobalStyle';

export default function BasicModal(props) {
  const { onSubmitFn, header, showModal, setModal } = props;

  const onSubmit = () => {
    let successfullySubmitted = onSubmitFn();
    if (successfullySubmitted) {
      closeModal();
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Modal isVisible={showModal}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[GlobalStyle.text, styles.headerText]}>{header}</Text>
        </View>
        <View style={styles.body}>{props.children}</View>
        <View style={styles.footerBtnGrp}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <View style={styles.cancelBtn}>
                <Text style={[GlobalStyle.text, styles.cancelText]}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                onSubmit();
              }}>
              <View style={styles.createBtn}>
                <Text style={[GlobalStyle.text, styles.createText]}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  header: {
    borderRadius: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    padding: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    padding: 10,
    marginVertical: 5,
  },
  footerBtnGrp: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  btnContainer: {
    width: '45%',
  },
  cancelBtn: {
    borderColor: colors.golden,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  cancelText: {
    color: colors.golden,
    textAlign: 'center',
  },
  createBtn: {
    backgroundColor: colors.golden,
    borderColor: colors.golden,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  createText: {
    color: '#fff',
    textAlign: 'center',
  },
});
