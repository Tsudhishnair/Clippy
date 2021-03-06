import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootContextProvider } from './app/store/RootContext';

import colors from './app/constants/colors';
import Clippy from './app/index';

export default function App() {
  return (
    <>
      <RootContextProvider>
        <SafeAreaView style={styles.topContainer} />
        <SafeAreaView style={styles.rootContainer}>
          <Clippy />
        </SafeAreaView>
      </RootContextProvider>
    </>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  topContainer: {
    flex: 0,
    backgroundColor: colors.primaryColor,
  },
});
