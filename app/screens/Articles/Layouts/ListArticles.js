import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Linking, Alert, Image } from 'react-native';

import EmptyState from '../../../components/EmptyState';
import colors from '../../../constants/colors';
import { favIconBaseUrl } from '../../../constants/Urls';
import { GlobalStyle } from '../../../constants/GlobalStyle';

export default function ListArticles({ articleItems, handleBottomSheet }) {
  const articleList = [...articleItems];

  const sectionHeader = ({ title }) => {
    if (title !== 'UnRead') {
      return <Text style={[GlobalStyle.text, styles.header]}>{title}</Text>;
    }
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
        <View style={styles.articleItemWrapper}>
          <Image
            source={{
              uri: `${favIconBaseUrl}${item.url}`,
            }}
            style={styles.domainIcon}
          />
          <Text style={[GlobalStyle.text, styles.articleItem]}>{item.title}</Text>
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
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  articleItemWrapper: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  articleItem: {
    fontSize: 16,
    color: '#261C1C',
    textAlign: 'left',
    marginHorizontal: 10,
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
  domainIcon: {
    height: 25,
    width: 25,
  },
});
