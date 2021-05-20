import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BasicModal from '../../components/Modal';
import { RootContext } from '../../store/RootContext';
import { GlobalStyle } from '../../constants/GlobalStyle';
import { ModalContext } from '../../store/ModalContext';
import colors from '../../constants/colors';

export default function CreateOrEditClip({ initialValues, setToast }) {
  const [clipUrl, setClipUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const { data, createClip, editClip } = useContext(RootContext);
  const { showCreateOrEditClipModal, setCreateOrEditClipModal } = useContext(ModalContext);

  useEffect(() => {
    const collectionDropDownItem = data.collection_list.map((collectionName, index) => {
      return { label: collectionName, value: collectionName };
    });
    setItems(collectionDropDownItem);
  }, [data]);

  useEffect(() => {
    if (initialValues.isEditClip) {
      setClipUrl(initialValues.clipUrl);
      setCollectionName(initialValues.collectionName);
    }
    return () => {
      setError(false);
      setClipUrl('');
      setCollectionName(null);
    };
  }, [initialValues]);

  const submitFn = async () => {
    try {
      const response = await fetch(clipUrl);

      const responseText = await response.text();
      let title = 'Article item';
      const titleCheckRegex = /<title[^>]*>([^<]+)<\/title>/;
      if (titleCheckRegex.test(responseText)) {
        title = responseText.match(titleCheckRegex)[1];
      }
      const dataObj = { title: title != null ? title : '-', url: clipUrl, hasRead: false };
      if (!initialValues.isEditClip) {
        createClip({ ...dataObj }, collectionName);
        setToast({ type: 'success', message: 'New clip added successfully.', showToast: true });
      } else {
        editClip({ ...dataObj }, collectionName, initialValues.id);
        setToast({ type: 'success', message: 'Clip updated successfully.', showToast: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (collectionName !== null && clipUrl !== '') {
      submitFn();
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  return (
    <View>
      <BasicModal onSubmitFn={handleSubmit} header={'Create a clip'} showModal={showCreateOrEditClipModal} setModal={setCreateOrEditClipModal}>
        <View>
          <Text style={[GlobalStyle.text, styles.label]}>Collection</Text>
          <DropDownPicker
            open={open}
            value={collectionName}
            items={items}
            setOpen={setOpen}
            setValue={setCollectionName}
            setItems={setItems}
            searchable={false}
            dropDownDirection="TOP"
            style={{ ...styles.dropDownInput }}
            dropDownContainerStyle={{
              ...styles.dropDownBox,
            }}
          />
          <Text style={[GlobalStyle.text, styles.label]}>URL</Text>
          <TextInput style={[GlobalStyle.text, styles.input]} onChangeText={setClipUrl} value={clipUrl} />
          {error && <Text style={styles.errorText}>Error: Some fields missing or incorrect</Text>}
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#261C1C',
    marginVertical: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    padding: 10,
  },
  dropDownInput: {
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',
    borderRadius: 2,
    height: 40,
  },
  dropDownBox: {
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',
    borderRadius: 2,
  },
  errorText: {
    color: colors.primaryColor,
  },
});
