import React from 'react'
import { View, StyleSheet } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function GradientIconButton(props) {
  const { icon, size, color } = props;
  return (
    <View style={styles.buttonGroup}>
        <LinearGradient
            style={styles.button}
            colors={['#A8E890', '#749F82']}
            start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
        >
            <Icon style={styles.icon} name={icon} size={size} color={color} />
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
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
        width: '38%',
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