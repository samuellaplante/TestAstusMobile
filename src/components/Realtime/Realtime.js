import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  }
]

class Realtime extends React.Component {
  render() {
    return (
      <View>
        <Header outerContainer={styles.outerContainer}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.openDrawer() }}
          centerComponent={{ text: 'Vehicles', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
              />
            ))
          }
        </List>
      </View>
    );
  }
  openDrawer(){
    this.props.navigation.navigate("DrawerOpen");
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 1200,
    padding: 0,
  }
});

export default Realtime;