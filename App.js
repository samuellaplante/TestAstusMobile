import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/Login'
import Realtime from './src/components/Realtime/Realtime'
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator({
  Login: {
    screen: Login
  },
  Realtime: {
    screen: Realtime
  }},
  {
  InitialRouteName: 'Login'
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}