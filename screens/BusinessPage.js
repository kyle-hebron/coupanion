import React, { Component, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, Button } from 'react-native';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';


let count = 90;

export default function BusinessPage({navigation}) {

    return (
       
        <SafeAreaView style={styles.container}>
             <ScrollView>
             <Text style={{fontSize: 69, textAlign: 'left', margin: 10,fontWeight: 'bold', color: 'white'}}>Profile</Text>
             <View style={styles.balloon}>
            <Image 
                source={require('../assets/wendy.png')}  
                style={styles.logo} 
            />
                <View style={{paddingHorizontal: 15, paddingTop: 20}}>
                    <Text style={{alignItems: 'left', fontSize: 25, color: 'white', fontWeight: 'bold',}}>Wendys</Text>
                    <Text style={styles.name}>18111 Nordhoff St, Northridge, CA 91330 </Text>
                    <Text style={styles.name}>(818) 677-2285</Text>
                </View>
            </View>
            <View style={styles.balloon}>
                <View style={styles.couponPack}>
                    <Text style={{fontSize: 75}}>This is a placeholder</Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
       
    )



}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#102C54',
        justifyContent: 'center',
        flex: 1
    },

    logo: {
        
        alignItems: 'left',
        width: 100,
        height: 100,
        borderRadius: 200/2
    },

    name: {
        alignItems: 'left',
        fontSize: 20,
        color: 'white',
    },

    balloon: {
        paddingHorizontal: 35,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        
    },

    couponPack: {
        paddingHorizontal: 35,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center',
        
        backgroundColor: '#3976cc'
    }
    
  });

  