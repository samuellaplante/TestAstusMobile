import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { inject, observer } from 'mobx-react';

import LoginForm from './LoginForm';

@inject('authenticationStore')
@observer
class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/astus-logo.png')} />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm onLogin={() => this.onLogin()} />
                </View>
            </KeyboardAvoidingView>
        );
    }
    onLogin() {
        this.props.authenticationStore.login().then(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: "MainApp"}),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});

export default Login;