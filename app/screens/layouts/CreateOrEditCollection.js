import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import BasicModal from '../../components/Modal';
import colors from '../../constants/colors';
import { GlobalStyle } from '../../constants/GlobalStyle';
import { ModalContext } from '../../store/ModalContext';
import { RootContext } from '../../store/RootContext';

export default function CreateOrEditCollection({ initialValues }) {
  const { showCreateOrEditCollectionModal, setCreateOrEditCollectionModal } = useContext(ModalContext);
  const { createCollection, editCollection } = useContext(RootContext);
  const [collectionName, setCollectionName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialValues.isEditCollection) {
      setCollectionName(initialValues.collectionName);
    }
    return () => {
      setError(false);
      setCollectionName('');
    };
  }, [initialValues]);

  const handleSubmit = () => {
    const val = collectionName.trim();
    if (/^[A-Za-z]+$/.test(val)) {
      if (initialValues.isEditCollection) {
        editCollection(initialValues.collectionName, val);
      } else {
        createCollection(val);
      }
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
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
          <TextInput
            style={[GlobalStyle.text, styles.input]}
            onChangeText={setCollectionName}
            value={collectionName}
            autoFocus
            keyboardType={'default'}
          />
          {error && (
            <View>
              <Text style={styles.errorText}>Should only use alphabets</Text>
            </View>
          )}
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
  errorText: {
    color: colors.primaryColor,
  },
});
