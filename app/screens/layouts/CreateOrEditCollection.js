import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import BasicModal from '../../components/Modal';
import { GlobalStyle } from '../../constants/GlobalStyle';
import { ModalContext } from '../../store/ModalContext';
import { RootContext } from '../../store/RootContext';

export default function CreateOrEditCollection({ initialValues }) {
  const { showCreateOrEditCollectionModal, setCreateOrEditCollectionModal } = useContext(ModalContext);
  const { createCollection, editCollection } = useContext(RootContext);
  const [collectionName, setCollectionName] = useState('');
  useEffect(() => {
    if (initialValues.isEditCollection) {
      setCollectionName(initialValues.collectionName);
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (initialValues.isEditCollection) {
      editCollection(initialValues.collectionName, collectionName);
    } else {
      createCollection(collectionName);
    }
  };

  return (
    <View>
      <BasicModal
        onSubmitFn={handleSubmit}
        header={'Create a collection'}
        showModal={showCreateOrEditCollectionModal}
        setModal={setCreateOrEditCollectionModal}>
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
