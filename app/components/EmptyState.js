import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../constants/colors';
import { GlobalStyle } from '../constants/GlobalStyle';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.text, styles.text]}>{message}</Text>
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
    width: '60%',
    color: colors.grey,
  },
});
