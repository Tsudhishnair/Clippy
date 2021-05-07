import React from 'react';
import { Text, View, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../constants/colors';

export default function BasicModal(props) {
  return (
    <Modal isVisible={true}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{props.header}</Text>
        </View>
        <View style={styles.body}>{props.children}</View>
        <View style={styles.footerBtnGrp}>
          <View style={styles.btnContainer}>
            <TouchableOpacity>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity>
              <View style={styles.createBtn}>
                <Text style={styles.createText}>Create</Text>
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
    fontStyle: 'italic',
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
