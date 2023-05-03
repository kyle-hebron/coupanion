import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

import GradientIconButton from '../components/GradientIconButton';
import GradientTextButton from '../components/GradientTextButton';
import PlainInput from '../components/PlainInput';

import { db } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, updateProfile} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function BusinessRegister({navigation}){
    //const {isBusiness} = route.params;
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const auth = getAuth();
    const user = auth.currentUser;
    

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
                <PlainInput icon="house-user" text="Address Line 1"  secure={false} handleChange={setAddress1}/>
                <PlainInput icon="house-user" text="Address Line 2"  secure={false} handleChange={setAddress2}/>
                <PlainInput icon="house-user" text="City"  secure={false} handleChange={setCity}/>
                <PlainInput icon="house-user" text="State"  secure={false} handleChange={setState}/>
                <PlainInput icon="house-user" text="ZIP"  secure={false} handleChange={setZip}/>
            </View>
            <View styles={styles.bottom}>
                <TouchableOpacity onPress={() => {signAddress(address1, address2, city, state, zip)}}>
                    <GradientTextButton text={"Sign Up"} styles={styles} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
    function signAddress(address1, address2, city, state, zip){
        if(user){
            var temp = user.uid;
                setDoc(doc(db, "Business people", user.uid),{
                    AddressInfo: {
                        address1: address1,
                        address2: address2,
                        city: city,
                        state: state,
                        zip: zip,
                    } 

                }, {merge: true});

                navigation.navigate("QuestionBusiness", {id: temp});


            } else {
                console.log("No Business Created")
                setError("No Business Created")
            }
         
    }
    
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#102C54',
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
        marginBottom: 5,
        color: '#FFFFFF',
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
