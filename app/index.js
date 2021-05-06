import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Navbar from './components/Navbar';

const Stack = createStackNavigator();

export default function Clippy() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  });

  const screenNames = {
    Home: 'Home',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.Home}
        screenOptions={{
          header: props => <Navbar {...props} />,
        }}>
        <Stack.Screen name={screenNames.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
