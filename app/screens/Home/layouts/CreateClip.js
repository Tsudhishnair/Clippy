import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BasicModal from '../../../components/Modal';

export default function CreateClip({ showModal, setModal }) {
  const [collectionName, setCollectionName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'React', value: 'React' },
  ]);

  return (
    <View>
      <BasicModal header={'Create a clip'} showModal={showModal} setModal={setModal}>
        <View>
          <Text style={styles.label}>Collection</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={false}
            dropDownDirection="TOP"
            style={{ ...styles.dropDownInput }}
            dropDownContainerStyle={{
              ...styles.dropDownBox,
            }}
          />
          <Text style={styles.label}>URL</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCollectionName}
            value={collectionName}
            autoFocus
          />
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#261C1C',
    marginVertical: 5,
    fontSize: 14,
    fontStyle: 'italic',
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
