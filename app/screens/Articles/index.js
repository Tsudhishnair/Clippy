import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ListArticles from './Layouts/ListArticles';
import ArticleBottomSheet from './Layouts/ArticleBottomSheet';
import CreateOrEditClip from '../layouts/CreateOrEditClip';
import { groupBy } from '../../utils/mainUtils';
import { RootContext } from '../../store/RootContext';
import { ModalContext } from '../../store/ModalContext';

export default function Articles({ route }) {
  const { selectedCollectionId, selectedCollectionName } = route.params;

  const { data } = useContext(RootContext);
  const { showBottomSheet, setBottomSheet, showCreateOrEditClipModal } = useContext(ModalContext);

  const [formattedArticle, setFormattedArticle] = useState([]);
  const [selectedArticleItem, setSelectedArticle] = useState(null);
  const [clipInitialValues, setClipInitialValues] = useState(null);
  useEffect(() => {
    const selectedItem = data.data.filter(item => item.id == selectedCollectionId)[0];
    const articleListItems = selectedItem.articles;
    const groupedArrayBasedOnKey = groupBy(articleListItems, 'hasRead');

    const formattedArticleObj = [
      { title: 'UnRead', data: groupedArrayBasedOnKey.false || [] },
      { title: 'Read', data: groupedArrayBasedOnKey.true || [] },
    ];
    //@Todo: Handle empty state of data
    setFormattedArticle(formattedArticleObj);
  }, [selectedCollectionId, data]);

  const handleBottomSheet = item => {
    setClipInitialValues({ isEditClip: true, collectionName: selectedCollectionName, clipUrl: item.url, id: item.id });
    setSelectedArticle(item);
    setBottomSheet(!showBottomSheet);
  };

  return (
    <View style={styles.container}>
      <ListArticles articleItems={formattedArticle} handleBottomSheet={handleBottomSheet} />
      <ArticleBottomSheet selectedArticle={selectedArticleItem} />
      {showCreateOrEditClipModal && selectedArticleItem != null && <CreateOrEditClip initialValues={clipInitialValues} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
