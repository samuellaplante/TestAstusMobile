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
        <VehicleItem title={item.VehicleName}>
          {this.renderContent(item)}
        </VehicleItem>
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

  renderContent(rowData) {
    return (
      <View style={{
        backgroundColor: '#31363D'
      }}>
        <Text style={{
          paddingTop: 15,
          paddingRight: 15,
          paddingLeft: 15,
          paddingBottom: 15,
          color: '#fff',
        }}>
          {this.getDetail(rowData)}
        </Text>
        <View style={{ flex: 1, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5c6672' }}>
          <TouchableOpacity style={{ width: 50 }}>
            <Icon name="add-location" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50 }}>
            <Icon name="description" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  getDetail(vehicleLastState) {
    var value = "";
    if (vehicleLastState.IsInTrip && vehicleLastState.PositionSpeed > 0) {
      value = vehicleLastState.PositionSpeed + " km / h";
      value += ", " + new Date(vehicleLastState.PositionDate).toString("yyyy-MM-dd HH:mm:ss");
    } else {
      if (vehicleLastState.Location != null && vehicleLastState.Location != "")
        value = vehicleLastState.Location;
      if (vehicleLastState.Territory != null && vehicleLastState.Territory != "") {
        if (value != "") value += ", ";
        value += vehicleLastState.Territory;
      }
    }

    if (vehicleLastState.DriverName != null && vehicleLastState.DriverName != "") {
      if (value != "") value += ", ";
      value += vehicleLastState.DriverName;
    }

    return value;
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 1200,
    padding: 0,
  }
});

export default Realtime;