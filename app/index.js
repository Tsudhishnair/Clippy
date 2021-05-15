import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Articles from './screens/Articles';
import Navbar from './components/Navbar';
import { RootContextProvide } from './store/RootContext';

const Stack = createStackNavigator();

export default function Clippy() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  });

  const screenNames = {
    Home: 'Home',
    Articles: 'Articles',
  };

  return (
    <NavigationContainer>
      <RootContextProvide>
        <Stack.Navigator
          initialRouteName={screenNames.Home}
          screenOptions={{
            header: props => <Navbar {...props} />,
          }}>
          <Stack.Screen name={screenNames.Home} component={Home} />
          <Stack.Screen name={screenNames.Articles} component={Articles} />
        </Stack.Navigator>
      </RootContextProvide>
    </NavigationContainer>
  );
}
