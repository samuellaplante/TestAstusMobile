import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { inject, observer } from 'mobx-react'

@inject('authenticationStore')
@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {rememberMe: true};
    }

    handleEmailChange = e => {
        this.props.authenticationStore.setUsername(e);
    }
    handlePasswordChange = e => this.props.authenticationStore.setPassword(e);

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style={styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            autoComplete={false}
                            returnKeyType="next" 
                            placeholder='Email' 
                            onChangeText={(e) => this.handleEmailChange(e)}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#666'/>

                <TextInput style={styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           autoComplete={false}
                           underlineColorAndroid='transparent'
                           placeholderTextColor='#666' 
                           onChangeText={(e) => this.handlePasswordChange(e)}
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
        this.props.onLogin();
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