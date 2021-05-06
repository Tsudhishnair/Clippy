import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 22,
    color: colors.grey,
  },
});
