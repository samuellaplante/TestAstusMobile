import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/Login'
import Realtime from './src/components/Realtime/Realtime'
import { StackNavigator, DrawerNavigator } from 'react-navigation';

const DrawerStack = DrawerNavigator({
  Realtime: { screen: Realtime }
})

const RootStack = StackNavigator({
  Login: {
    screen: Login,

  },
  MainApp: {
    screen: DrawerStack
  }
}, {
  headerMode: 'none'
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}