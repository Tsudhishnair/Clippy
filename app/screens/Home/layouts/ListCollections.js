import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import EmptyState from '../../../components/EmptyState';
import colors from '../../../constants/colors';

export default function ListCollection(props) {
  const { data } = props;
  const renderArticleItem = ({ item }) => {
    return <Text style={styles.articleItem}>{item.title}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listRenderContainer}>
        <Text style={styles.collectionName}>{item.collection_name}</Text>
        <FlatList
          data={item.articles}
          renderItem={renderArticleItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.articleItem}>No clips!</Text>}
        />
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.itemSeparatorLine} />;
  };

  const emptyStateComp = () => {
    return (
      <View style={{ flex: 1 }}>
        <EmptyState message={'No clips! Start by creating a collection using the + button'} />
      </View>
    );
  };

  return (
    <FlatList
      data={data.data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={emptyStateComp}
      ItemSeparatorComponent={itemSeparator}
      contentContainerStyle={styles.sectionListContainer}
    />
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    flexGrow: 1,
  },
  itemSeparatorLine: {
    borderColor: colors.grey,
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listRenderContainer: {
    margin: 15,
  },
  collectionName: {
    color: '#261C1C',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 21,
  },
  articleItem: {
    color: colors.grey,
    marginTop: 10,
  },
});
