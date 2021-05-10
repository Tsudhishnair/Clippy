import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import BasicModal from '../../../components/Modal';

export default function CreateCollection({ showModal, setModal }) {
  const [collectionName, setCollectionName] = useState('');
  return (
    <View>
      <BasicModal header={'Create a collection'} showModal={showModal} setModal={setModal}>
        <View>
          <Text style={styles.label}>Collection name</Text>
          <TextInput style={styles.input} onChangeText={setCollectionName} value={collectionName} autoFocus />
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {},
  input: {
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    padding: 10,
    marginTop: 10,
  },
});
