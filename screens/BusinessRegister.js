import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

import GradientIconButton from '../components/GradientIconButton';
import GradientTextButton from '../components/GradientTextButton';
import PlainInput from '../components/PlainInput';

export default function RegisterScreen({navigation}){
    //const {isBusiness} = route.params;
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
                <Text style={styles.title}>Business Address</Text>
                <PlainInput icon="house-user" text="Address Line 1"  secure={false} />
                <PlainInput icon="house-user" text="Address Line 2"  secure={false} />
                <PlainInput icon="house-user" text="City"  secure={false} />
                <PlainInput icon="house-user" text="State"  secure={false} />
                <PlainInput icon="house-user" text="ZIP"  secure={false} />
            </View>
            <View styles={styles.bottom}>
                <TouchableOpacity onPress={() => {navigation.navigate('CouponMaker')}}>
                    <GradientTextButton text={"Sign Up"} styles={styles} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
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
        fontSize: '24',
        fontWeight: '700',
        marginTop: '5%',
        marginLeft: 2,
        marginBottom: 5
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
