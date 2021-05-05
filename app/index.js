import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

export default function Clippy() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  });
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
}
