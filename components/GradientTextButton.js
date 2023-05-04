import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function GradientTextButton(props) {
  const { text } = props;
  return (
    <View style={styles.buttonGroup}>
      <LinearGradient
          style={styles.iconButton}
          colors={['#102C54', '#0A1D38']}
          start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient> 
    </View>
  )
}

const styles = StyleSheet.create({
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