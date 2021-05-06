import React from 'react';
import { View, StyleSheet } from 'react-native';

import EmptyState from '../../components/EmptyState';

export default function Home() {
  return (
    <View style={styles.container}>
      <EmptyState message={'No clips! Start by creating a collection using the + button'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
