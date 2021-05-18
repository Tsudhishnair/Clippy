import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootContext } from '../../store/RootContext';
import ListArticles from './Layouts/ListArticles';
import { groupBy } from '../../utils/mainUtils';
import ArticleBottomSheet from './Layouts/ArticleBottomSheet';
import { ModalContext } from '../../store/ModalContext';

export default function Articles({ route }) {
  const { selectedCollectionId } = route.params;

  const { data } = useContext(RootContext);
  const { showBottomSheet, setBottomSheet } = useContext(ModalContext);

  const [formattedArticle, setFormattedArticle] = useState([]);
  const [selectedArticleItem, setSelectedArticle] = useState(null);

  useEffect(() => {
    const articleListItems = data.data.filter(item => item.id == selectedCollectionId)[0].articles;

    const groupedArrayBasedOnKey = groupBy(articleListItems, 'hasRead');

    const formattedArticleObj = [
      { title: 'UnRead', data: groupedArrayBasedOnKey.false || [] },
      { title: 'Read', data: groupedArrayBasedOnKey.true || [] },
    ];
    //@Todo: Handle empty state of data
    setFormattedArticle(formattedArticleObj);
  }, [selectedCollectionId, data]);

  const handleBottomSheet = item => {
    setSelectedArticle(item);
    setBottomSheet(!showBottomSheet);
  };

  const actionFunctions = () => {};

  return (
    <View style={styles.container}>
      <ListArticles articleItems={formattedArticle} handleBottomSheet={handleBottomSheet} />
      <ArticleBottomSheet selectedArticle={selectedArticleItem} actionFunctions={actionFunctions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
