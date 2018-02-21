import React from 'react';
import { Component, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

class VehicleItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: props.data,
            expanded: false,
            animation: new Animated.Value()
        };

    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
        if (!this.state.maxHeight) {
            this.setState({
                maxHeight: event.nativeEvent.layout.height,
            });
        }
    }

    _setMinHeight(event) {
        if (!this.state.minHeight) {
            this.setState({
                minHeight: event.nativeEvent.layout.height,
                animation: new Animated.Value(event.nativeEvent.layout.height),
            });
        }
    }

    render() {
        let child = null;
        if (this.state.expanded) {
            child = (<View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                {this.renderContent(this.state.data)}
            </View>);
        }
        return (
            <Animated.View
                style={{ height: this.state.animation }}>
                <TouchableOpacity style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)} onPress={this.toggle.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </TouchableOpacity>
                {child}
            </Animated.View>
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
                <View style={{ height: 50,alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#5c6672' }}>
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
        var value = null;
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

        return value || "N/A";
    }
}

var styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9'
    },
    title: {
        color: '#666',
        fontWeight: 'bold'
    },
    body: {
        paddingTop: 0
    }
});

export default VehicleItem;
