import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import FabButton from '../../components/Fab';
import CreateOrEditClip from '../layouts/CreateOrEditClip';
import CreateOrEditCollection from '../layouts/CreateOrEditCollection';
import ListCollection from './layouts/ListCollections';
import BottomSheetLayout from './layouts/BottomSheetLayout';
import { RootContext } from '../../store/RootContext';
import { ModalContext } from '../../store/ModalContext';
import Toast from '../../components/toast';

export default function Home() {
  const { data } = useContext(RootContext);

  const { setCreateOrEditCollectionModal, setBottomSheet } = useContext(ModalContext);
  const [toast, setToast] = useState(false);
  const clipInitialValues = { isEditClip: false };
  const collectionInitialValues = { isEditCollection: false };

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
      <CreateOrEditCollection initialValues={collectionInitialValues} setToast={setToast} />
      <CreateOrEditClip initialValues={clipInitialValues} setToast={setToast} />
      {!!toast && <Toast toastObj={toast} handleToast={setToast} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
