import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import BasicModal from '../../components/Modal';

export default function CreateCollection() {
  const [collectionName, setCollectionName] = useState('');
  return (
    <View>
      <BasicModal header={'Create a collection'}>
        <View>
          <Text style={styles.label}>Collection name</Text>
          <TextInput style={styles.input} onChangeText={setCollectionName} value={collectionName} />
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
