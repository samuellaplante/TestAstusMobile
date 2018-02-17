import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';
import { CheckBox } from 'react-native-elements'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {rememberMe: true};
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style={styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            autoComplete={false}
                            keyboardType='email-address' 
                            returnKeyType="next" 
                            placeholder='Email' 
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#666'/>

                <TextInput style={styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           autoComplete={false}
                           underlineColorAndroid='transparent'
                           placeholderTextColor='#666' 
                           secureTextEntry/>
               
                <CheckBox right
                          backgroundColor='rgba(225,225,225,0.2)'
                          containerStyle={styles.checkbox}
                          checked={this.state.rememberMe}
                          onPress={() => this.onRememberMeCheck()}
                          title='Remember me'/>

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onLogin()}>
                    <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity> 
            </View>
        );
    }
    onRememberMeCheck(){
        this.setState({rememberMe: !this.state.rememberMe});
    }
    onLogin(){
        console.log(this.props.navigation.navigate);
        this.props.navigation.navigate('Realtime');
    }
}


const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    checkbox: {
        backgroundColor: '#EEE'
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        borderRadius: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#666'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
});

export default LoginForm;