import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, ListView, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import OpenDrawerNavigator from '../Shared/OpenDrawerNavigator'
import Loading from '../Shared/Loading'
import VehicleItem from './VehicleItem'

import { inject, observer } from 'mobx-react';
import Accordion from 'react-native-collapsible/Accordion';


@inject('vehicleLastStateStore')
@observer
class Realtime extends Component {
  componentDidMount() {
    this.props.vehicleLastStateStore.getAll();
  }

  render() {
    let view = <Loading />

    if (this.props.vehicleLastStateStore.store != undefined) {
      view = this.props.vehicleLastStateStore.store.map((item, i) => (
        <VehicleItem expanded={false} key={item.VehicleID} title={item.VehicleName} data={item} />
      ));
    }

    return (
      <View style={{ flex: 1 }}>
        <Header outerContainer={styles.outerContainer}
          leftComponent={<OpenDrawerNavigator navigation={this.props.navigation} />}
          centerComponent={{ text: 'Vehicles', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        <ScrollView style={{ flex: 1 }}>
          {view}
        </ScrollView>
      </View>
    );
  }

  renderHeader(rowData) {
    return (
      <View style={{
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
      }}>
        <Text>{rowData.VehicleName}</Text>
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 1200,
    padding: 0,
  }
});

export default Realtime;