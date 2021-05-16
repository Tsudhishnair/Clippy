import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import BasicModal from '../../../components/Modal';
import { GlobalStyle } from '../../../constants/GlobalStyle';

export default function CreateCollection(props) {
  const { createCollection, showModal, setModal } = props;

  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = () => {
    createCollection(collectionName);
  };

  return (
    <View>
      <BasicModal onSubmitFn={handleSubmit} header={'Create a collection'} showModal={showModal} setModal={setModal}>
        <View>
          <Text style={GlobalStyle.text}>Collection name</Text>
          <TextInput style={[GlobalStyle.text, styles.input]} onChangeText={setCollectionName} value={collectionName} autoFocus />
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    padding: 10,
    marginTop: 10,
  },
});
