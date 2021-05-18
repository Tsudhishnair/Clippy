import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BasicModal from '../../../components/Modal';
import { RootContext } from '../../../store/RootContext';
import { GlobalStyle } from '../../../constants/GlobalStyle';
import { ModalContext } from '../../../store/ModalContext';

export default function CreateOrEditClip({ initialValues }) {
  const [clipUrl, setClipUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [items, setItems] = useState([]);

  const { data, createClip, editClip } = useContext(RootContext);
  const { showCreateOrEditClipModal, setCreateOrEditClipModal } = useContext(ModalContext);

  useEffect(() => {
    if (initialValues.isEditClip) {
      setClipUrl(initialValues.clipUrl);
      setCollectionName(initialValues.collectionName);
    }
  }, []);

  useEffect(() => {
    const collectionDropDownItem = data.collection_list.map((collectionName, index) => {
      return { label: collectionName, value: collectionName };
    });
    setItems(collectionDropDownItem);
  }, [data]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(clipUrl);
      const responseText = await response.text();
      const title = responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1];
      const dataObj = { title: title != null ? title : '-', url: clipUrl, hasRead: false };
      if (!initialValues.isEditClip) {
        createClip({ ...dataObj }, collectionName);
      } else {
        editClip({ ...dataObj }, collectionName, initialValues.id);
      }
    } catch (error) {
      console.error(error);
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
});
