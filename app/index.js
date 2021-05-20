import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './screens/Home';
import Articles from './screens/Articles';
import { Navbar, RightSideNav, LeftSideNav } from './components/Navbar';
import { RootContext } from './store/RootContext';
import { ModalContextProvider } from './store/ModalContext';
import colors from './constants/colors';

const Stack = createStackNavigator();

export default function Clippy() {
  const { setInitialState } = useContext(RootContext);

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      let clippyState = await AsyncStorage.getItem('clippyState');
      if (clippyState !== null) {
        clippyState = JSON.parse(clippyState);
        setInitialState(clippyState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const screenNames = {
    Home: 'Home',
    Articles: 'Articles',
  };

  return (
    <NavigationContainer>
      <ModalContextProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
        <Stack.Navigator
          initialRouteName={screenNames.Home}
          screenOptions={{
            headerTitle: props => <Navbar {...props} />,
            headerStyle: { backgroundColor: colors.primaryColor },
          }}>
          <Stack.Screen name={screenNames.Home} component={Home} />
          <Stack.Screen
            name={screenNames.Articles}
            component={Articles}
            options={{ headerLeft: props => <LeftSideNav {...props} />, headerRight: props => <RightSideNav {...props} /> }}
          />
        </Stack.Navigator>
      </ModalContextProvider>
    </NavigationContainer>
  );
}
