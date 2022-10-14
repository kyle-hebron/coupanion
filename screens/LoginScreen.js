import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

export class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image 
            style={styles.logo}
            source={require("../assets/Logo.png")}
        />
        <Text>LoginScreen</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8E890',
        alignItems: 'center',
        flex: 1
    },

    logo: {
        height: 50,
        marginTop: 250,
        resizeMode: 'contain'
    }
})

export default LoginScreen