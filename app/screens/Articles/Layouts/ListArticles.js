import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

import EmptyState from '../../../components/EmptyState';
import colors from '../../../constants/colors';

export default function ListArticles({ articleItems, handleBottomSheet }) {
  const articleList = [...articleItems];

  const sectionHeader = ({ title }) => {
    return <Text style={styles.header}>{title}</Text>;
  };

  const openUrl = async url => {
    const canOpenTheSpecifiedUrl = await Linking.canOpenURL(url);
    if (canOpenTheSpecifiedUrl) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Something unexpected occurred.', `Cannot open this url: ${url}`);
    }
  };

  const articleListLayout = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          handleBottomSheet(item);
        }}
        onPress={() => {
          openUrl(item.url);
        }}>
        <View>
          <Text style={styles.articleItem}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const emptyState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <EmptyState message={'No article available'} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={articleList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => articleListLayout({ item })}
        renderSectionHeader={({ section: { title } }) => sectionHeader({ title })}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={emptyState}
        contentContainerStyle={styles.sectionListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  header: {
    color: colors.grey,
    fontStyle: 'italic',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  articleItem: {
    fontSize: 16,
    color: '#261C1C',
    fontStyle: 'italic',
    textAlign: 'left',
    margin: 15,
  },
  itemSeparator: {
    borderColor: colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionListContainer: {
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
  },
});
