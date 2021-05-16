import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BasicModal from '../../../components/Modal';
import { RootContext } from '../../../store/RootContext';
import { GlobalStyle } from '../../../constants/GlobalStyle';

export default function CreateClip({ showModal, setModal }) {
  const [clipUrl, setClipUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [items, setItems] = useState([]);
  const { data, createClip } = useContext(RootContext);

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
      const title = responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1] || '-';
      createClip({ title: title, url: clipUrl, hasRead: false }, collectionName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <BasicModal onSubmitFn={handleSubmit} header={'Create a clip'} showModal={showModal} setModal={setModal}>
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
