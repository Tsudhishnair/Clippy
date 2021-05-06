import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.textLogo}>Clippy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    height: 60,
    justifyContent: 'flex-end',
    padding: 10,
  },
  textLogo: {
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: '700',
  },
});
