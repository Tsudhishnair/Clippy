import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-remix-icon';

import colors from '../constants/colors';

export default function Navbar(props) {
  const { previous, navigation } = props;
  const backButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View>
          <Icon name="ri-arrow-left-s-line" size="30" color={'#fff'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>{!!previous && backButton()}</View>
      <Text style={styles.textLogo}>Clippy</Text>
      <View style={styles.rightContainer}>
        {!!previous && (
          <>
            <Icon name="ri-edit-line" size="23" color={'#fff'} />
            <Icon name="ri-delete-bin-4-line" size="23" color={'#fff'} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
  },
  textLogo: {
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: '700',
  },
  rightContainer: {
    flexDirection: 'row',
  },
});
