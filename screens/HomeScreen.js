import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function RegisterScreen(){
   return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Discover</Text>
        <TextInput style={styles.TextInput} placeholder= 'search for nearby businesses' />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Trending</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 30 }}>Top Rated</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.boxContainer}>Coupons will display here</Text>
      </View>
    </SafeAreaView>
   )
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 45,
    paddingLeft: 30,
    paddingRight: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '60%',
    padding: 5
  },
  boxContainer: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 30,
    borderColor: '#cccccc',
    backgroundColor: '#cccccc',
    width: '100%'
  }

})
