import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import FabButton from '../../components/Fab';
import CreateClip from './layouts/CreateClip';
import CreateCollection from './layouts/CreateCollection';
import ListCollection from './layouts/ListCollections';
import BottomSheetLayout from './layouts/BottomSheetLayout';
import { RootContext } from '../../store/RootContext';

export default function Home() {
  const [showCreateCollectionModal, setCreateCollectionModal] = useState(false);
  const [showCreateClipModal, setCreateClipModal] = useState(false);
  const [showBottomSheet, setBottomSheet] = useState(false);
  const { data, createCollection } = useContext(RootContext);

  const actionAfterClosingBottomSheet = {
    setCollectionModal: () => {
      setCreateCollectionModal(true);
    },
    setClipModal: () => {
      setCreateClipModal(!showCreateClipModal);
    },
  };

  return (
    <View style={styles.container}>
      <ListCollection data={data} />
      <FabButton
        actionFn={() => {
          if (!data.collection_list.length) {
            setCreateCollectionModal(true);
          } else {
            setBottomSheet(true);
          }
        }}
      />
      <BottomSheetLayout showBottomSheet={showBottomSheet} setBottomSheet={setBottomSheet} actionFunctions={actionAfterClosingBottomSheet} />
      <CreateCollection createCollection={createCollection} showModal={showCreateCollectionModal} setModal={setCreateCollectionModal} />
      <CreateClip showModal={showCreateClipModal} setModal={setCreateClipModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
