import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ListArticles from './Layouts/ListArticles';
import ArticleBottomSheet from './Layouts/ArticleBottomSheet';
import CreateOrEditClip from '../layouts/CreateOrEditClip';
import { groupBy } from '../../utils/mainUtils';
import { RootContext } from '../../store/RootContext';
import { ModalContext } from '../../store/ModalContext';
import CreateOrEditCollection from '../layouts/CreateOrEditCollection';
import FabButton from '../../components/Fab';
import Toast from '../../components/toast';

export default function Articles({ route }) {
  const { selectedCollectionId, selectedCollectionName } = route.params;

  const { data } = useContext(RootContext);
  const {
    showBottomSheet,
    setBottomSheet,
    showCreateOrEditClipModal,
    setCreateOrEditClipModal,
    setSelectedCollection,
    setRenderCreateCollectionModal,
    showCreateOrEditCollectionModal,
    setCreateOrEditCollectionModal,
  } = useContext(ModalContext);

  const [formattedArticle, setFormattedArticle] = useState([]);
  const [selectedArticleItem, setSelectedArticle] = useState(null);
  const [clipInitialValues, setClipInitialValues] = useState({ isEditClip: false });
  const [collectionInitialValues, setCollectionInitialValues] = useState({ isEditCollection: false });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setRenderCreateCollectionModal({
      Fn: () => {
        renderCreateOrEditCollectionModal();
      },
    });
  }, []);

  useEffect(() => {
    if (data.data.length) {
      const selectedItem = data.data.filter(item => item.id == selectedCollectionId)[0];
      if (selectedItem !== undefined) {
        const articleListItems = selectedItem.articles;
        const groupedArrayBasedOnKey = groupBy(articleListItems, 'hasRead');
        if (!!groupedArrayBasedOnKey.false || groupedArrayBasedOnKey.true) {
          const formattedArticleObj = [
            { title: 'UnRead', data: !!groupedArrayBasedOnKey.false ? groupedArrayBasedOnKey.false : [] },
            { title: 'Read', data: !!groupedArrayBasedOnKey.true ? groupedArrayBasedOnKey.true : [] },
          ];
          setFormattedArticle(formattedArticleObj);
        } else {
          setFormattedArticle([]);
        }
        setSelectedCollection(selectedCollectionName);
      }
    }
  }, [selectedCollectionId, data]);

  const handleBottomSheet = item => {
    setClipInitialValues({ isEditClip: true, collectionName: selectedCollectionName, clipUrl: item.url, id: item.id });
    setSelectedArticle(item);
    setBottomSheet(!showBottomSheet);
  };

  const renderCreateOrEditCollectionModal = () => {
    setCollectionInitialValues({ isEditCollection: true, collectionName: selectedCollectionName });
    setCreateOrEditCollectionModal(!showCreateOrEditCollectionModal);
  };

  const fabActions = () => {
    setCreateOrEditClipModal(true);
  };

  return (
    <View style={styles.container}>
      <ListArticles articleItems={formattedArticle} handleBottomSheet={handleBottomSheet} />
      <ArticleBottomSheet selectedArticle={selectedArticleItem} setToast={setToast} />
      <FabButton actionFn={() => fabActions()} />
      {showCreateOrEditClipModal && <CreateOrEditClip initialValues={clipInitialValues} setToast={setToast} />}
      {showCreateOrEditCollectionModal && <CreateOrEditCollection initialValues={collectionInitialValues} setToast={setToast} />}
      {!!toast && <Toast toastObj={toast} handleToast={setToast} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
