import React from 'react';
import { View } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';
import { MapView } from 'expo';
import OpenDrawerNavigator from '../Shared/OpenDrawerNavigator'

export default class Map extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={<OpenDrawerNavigator navigation={this.props.navigation} />}
                    centerComponent={{ text: 'Map', style: { color: '#fff' } }}
                />
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    }
}