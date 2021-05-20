import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

import colors from '../constants/colors';
import { GlobalStyle } from '../constants/GlobalStyle';
import { RootContext } from '../store/RootContext';
import { ModalContext } from '../store/ModalContext';

export const Navbar = props => {
  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.text, styles.textLogo]}>Clippy</Text>
    </View>
  );
};

export const LeftSideNav = props => (
  <View>
    <TouchableOpacity {...props}>
      <View>
        <Icon name="ri-arrow-left-s-line" size="30" color={'#fff'} />
      </View>
    </TouchableOpacity>
  </View>
);

export const RightSideNav = props => {
  const { renderCreateCollectionModal, selectedCollection } = useContext(ModalContext);
  const { deleteCollection } = useContext(RootContext);
  const navigation = useNavigation();

  const handleCollectionDelete = () => {
    Alert.alert('Delete Collection', 'Deleting collection will delete all the articles that are there within the collection', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Home');
          deleteCollection(selectedCollection);
        },
      },
    ]);
  };

  return (
    <View style={styles.rightContainer}>
      {
        <>
          <TouchableOpacity
            onPress={() => {
              renderCreateCollectionModal.Fn();
            }}>
            <View style={styles.rightSideNavItem}>
              <Icon name="ri-edit-line" size="23" color={'#fff'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCollectionDelete();
            }}>
            <View style={styles.rightSideNavItem}>
              <Icon name="ri-delete-bin-4-line" size="23" color={'#fff'} />
            </View>
          </TouchableOpacity>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  textLogo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightSideNavItem: {
    marginRight: 5,
  },
});
