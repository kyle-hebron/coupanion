import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import GradientTextButton from '../components/GradientTextButton'
import IconInput from '../components/IconInput';

function LoginScreen({navigation}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
      <KeyboardAvoidingView style={styles.container}>
            <Image 
                style={styles.logo}
                source={require("../assets/Logo.png")}
            />
            
            <IconInput icon="user-circle" text="Email" handleChange={setUsername} secure={false} />
            <IconInput icon="unlock" text="Password" handleChange={setPassword} secure={true} />

            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterChoice')}
            >
                <Text>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Business')}>
                <GradientTextButton text="Sign In" styles={styles} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterChoice')}
            >
                <Text>Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign Up</Text></Text>
            </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8E890',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },

    logo: {
        height: 50,
        marginBottom: 15,
        resizeMode: 'contain'
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    iconButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 15,
        width: '90%',
        height: 56,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset : { width: 1, height: 5},
        marginBottom: 20
    },
})

export default LoginScreen