import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import FabButton from '../../components/Fab';
import CreateOrEditClip from './layouts/CreateOrEditClip';
import CreateOrEditCollection from './layouts/CreateOrEditCollection';
import ListCollection from './layouts/ListCollections';
import BottomSheetLayout from './layouts/BottomSheetLayout';
import { RootContext } from '../../store/RootContext';
import { ModalContext } from '../../store/ModalContext';

export default function Home() {
  const { data, createCollection } = useContext(RootContext);
  const { setCreateOrEditCollectionModal, showCreateOrEditClipModal, setBottomSheet } = useContext(ModalContext);

  const clipInitialValues = { isEditClip: false };

  const fabActions = () => {
    if (!data.collection_list.length) {
      setCreateOrEditCollectionModal(true);
    } else {
      setBottomSheet(true);
    }
  };

  return (
    <View style={styles.container}>
      <ListCollection data={data} />
      <FabButton actionFn={() => fabActions()} />
      <BottomSheetLayout />
      <CreateOrEditCollection />
      <CreateOrEditClip initialValues={clipInitialValues} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
