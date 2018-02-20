import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';
import OpenDrawerNavigator from '../Shared/OpenDrawerNavigator'
import Loading from '../Shared/Loading'
import { inject, observer } from 'mobx-react';

@inject('vehicleLastStateStore')
@observer
class Realtime extends Component {
  componentDidMount() {
    this.props.vehicleLastStateStore.getAll();
  }

  render() {
    let view = <Loading />
    if (this.props.vehicleLastStateStore.store != undefined) {
      view = <List>
        {
          this.props.vehicleLastStateStore.store.map((item, i) => (
            <ListItem
              key={i}
              title={item.VehicleName}
            />
          ))
        }
      </List>;
    }

    return (
      <View style={{flex: 1}}>
        <Header outerContainer={styles.outerContainer}
          leftComponent={<OpenDrawerNavigator navigation={this.props.navigation} />}
          centerComponent={{ text: 'Vehicles', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        <ScrollView style={{flex: 1}}>
          {view}
        </ScrollView>
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