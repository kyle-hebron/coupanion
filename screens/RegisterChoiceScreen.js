import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Button } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import {LinearGradient} from "expo-linear-gradient";

import GradientIconButton from '../components/GradientIconButton';

function RegisterChoiceScreen({navigation}){

    var isBusiness = false

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.logo}
                source={require("../assets/Logo.png")}
            />
            <Text>Signing up as a...</Text>

            <TouchableOpacity
                onPress={() => {
                    isBusiness = false
                    navigation.navigate('Register', {isBusiness: isBusiness})
                }}
            >
                <View style={styles.buttonGroup}>
                    <LinearGradient
                        style={styles.iconButton}
                        colors={['#A8E890', '#749F82']}
                        start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
                    >
                        <Icon style={styles.icon} name="user-circle" size={30} color="#FFF" />
                        <Text style={styles.text}>Customer</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    isBusiness = true
                    navigation.navigate('Register', {isBusiness: isBusiness})
                }}
            >
                <View style={styles.buttonGroup}>
                    <LinearGradient
                        style={styles.iconButton}
                        colors={['#A8E890', '#749F82']}
                        start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
                    >
                        <Icon style={styles.icon} name="building" size={30} color="#FFF" />
                        <Text style={styles.text}>Business</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('Login')}}
            >
                <GradientIconButton styles={styles} icon="arrow-left" size={30} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8E890',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 20
    },
    logo: {
        height: 50,
        marginBottom: 15,
        resizeMode: 'contain'
    },
    iconButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 15,
        width: '85%',
        height: 56,
        paddingLeft: 20
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 15,
        width: '50%',
        height: 56,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset : { width: 1, height: 5},
        marginBottom: 5
    },
})

export default RegisterChoiceScreen