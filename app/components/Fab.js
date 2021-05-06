import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-remix-icon';

import colors from '../constants/colors';

export default function FabButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.actionFn}>
        <Icon name="ri-add-circle-fill" size="65" color={colors.golden}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 10,
    right: 20,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
