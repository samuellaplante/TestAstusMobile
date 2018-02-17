import React, {Component} from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LoginForm from './LoginForm';

class Login extends Component {
    render(){
        return (
        <KeyboardAvoidingView  behavior="padding" style={styles.container}>
            <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/astus-logo.png')} />
                   </View>
               <View style={styles.formContainer}>
                   <LoginForm />
               </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});

export default Login;