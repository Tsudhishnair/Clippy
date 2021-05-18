import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmptyState from '../../../components/EmptyState';
import colors from '../../../constants/colors';
import { GlobalStyle } from '../../../constants/GlobalStyle';

export default function ListCollection(props) {
  const navigation = useNavigation();

  const { data } = props;

  const renderArticleItem = ({ item }) => {
    return <Text style={[GlobalStyle.text, styles.articleItem]}>{item.title}</Text>;
  };

  const handleCollectionItemPress = (id, name) => {
    navigation.navigate('Articles', { selectedCollectionId: id, selectedCollectionName: name });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleCollectionItemPress(item.id, item.collection_name);
        }}>
        <View style={styles.listRenderContainer}>
          <Text style={[GlobalStyle.text, styles.collectionName]}>{item.collection_name}</Text>
          <FlatList
            data={item.articles}
            renderItem={renderArticleItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={[GlobalStyle.text, styles.articleItem]}>No clips!</Text>}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.itemSeparatorLine} />;
  };

  const emptyStateComp = () => {
    return (
      <View style={styles.emptyStateContainer}>
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
  },
  articleItem: {
    color: colors.grey,
    marginTop: 5,
    fontSize: 12,
  },
  emptyStateContainer: {
    flex: 1,
  },
});
