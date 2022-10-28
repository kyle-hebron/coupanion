import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

import GradientIconButton from '../components/GradientIconButton';
import GradientTextButton from '../components/GradientTextButton';
import IconInput from '../components/IconInput';

export default function RegisterScreen({route, navigation}){
    const {isBusiness} = route.params;
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('RegisterChoice')}}
                >
                    <GradientIconButton styles={styles} icon="arrow-left" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View styles={styles.middle}>
                <Icon style={styles.profileIcon} name="user-circle" size={120} color="#000" />
                <TouchableOpacity style={styles.uploadText}>
                    <Text style={styles.uploadText}>Upload Profile Picture</Text>
                </TouchableOpacity>
                <IconInput icon="user-circle" text="Username"  secure={false} handleChange={setUsername} />
                <IconInput icon="mail-bulk" text="Email"  secure={false} handleChange={setEmail} />
                <IconInput icon="unlock" text="Password"  secure={true} handleChange={setPassword} />
                <IconInput icon="unlock" text="Confirm Password"  secure={true} handleChange={setConfirmPassword} />
            </View>
            <View styles={styles.bottom}>
                <TouchableOpacity
                    onPress={() => isBusiness ? navigation.navigate('BusinessRegister') : signUpUser(username, password, confirmPassword, email)}
                >
                    <GradientTextButton text={isBusiness ? "Next" : "Sign Up"} styles={styles} />
                </TouchableOpacity>
            </View>
            <Text>{error}</Text>
        </SafeAreaView>
    )

    function signUpUser(username, password, confirmPassword, email) {
        if(password === confirmPassword){
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                setError('')
            })
            .catch(err => setError(err.message))
        } else {
    
        }
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8E890',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    top: {
        alignSelf: 'flex-start'
    },
    middle: {
        
    },
    title: {
        fontSize: '32',
        fontWeight: '700',
        marginTop: '5%',
        marginLeft: 15,
        marginBottom: 25
    },
    profileIcon: {
        alignSelf: 'center',
    },
    uploadText: {
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 15
    }
})