import React, { useState, useContext, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { RootContext } from '../../store/RootContext';
import ListArticles from './Layouts/ListArticles';
import { groupBy } from '../../utils/mainUtils';
import ArticleBottomSheet from './Layouts/ArticleBottomSheet';

export default function Articles({ route, navigation }) {
  const { selectedCollectionId } = route.params;

  const { data } = useContext(RootContext);

  const [formattedArticle, setFormattedArticle] = useState([]);
  const [showBottomSheet, setBottomSheet] = useState(false);
  const [selectedId, setSelectedArticleId] = useState(null);

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

  const handleBottomSheet = id => {
    setSelectedArticleId(id);
    setBottomSheet(!showBottomSheet);
  };

  const actionFunctions = () => {};

  return (
    <View style={styles.container}>
      <ListArticles articleItems={formattedArticle} handleBottomSheet={handleBottomSheet} />
      <ArticleBottomSheet setBottomSheet={setBottomSheet} showBottomSheet={showBottomSheet} id={selectedId} actionFunctions={actionFunctions} />
      <Button
        title={'GO BACK'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});