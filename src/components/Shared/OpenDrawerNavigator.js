import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NavButton from 'react-native-elements/src/header/NavButton'

export default class DrawerNavigationOpener extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    }
    render() {
        return (<NavButton icon='menu' color='#fff' onPress={() => this.openDrawer()} />);
    }
    openDrawer() {
        this.props.navigation.navigate("DrawerOpen");
    }
}