import React, { useEffect } from "react";
import { SafeAreaView, TextInput, View, StyleSheet, Text, Button, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import MapView from "react-native-maps";
import IconInput from "../components/IconInput";
import GradientIconButton from "../components/GradientIconButton";
import GradientTextButton from "../components/GradientTextButton";
import { db } from '../firebase'
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function Verify({navigation}) {
    const auth = getAuth();
	const user = auth.currentUser;
    const userID = user.uid;
    const [codes, setCode] = useState(" ");
    
    const [coupons, setCoupons] = useState([ ]);
    const [discoun, setDiscount] = useState(" ");
    
    useEffect(() => {
    async function fetchData() {
        const q = query(collection(db, "Business people"));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            if(doc.id == userID)
                setCoupons(doc.data()['Coupons']);
             
            
        });
    } fetchData(); }, []);
    function setTrue(){
        
        if(coupons[codes] != undefined){

            var temp = coupons[codes].description;
            Alert.alert("Success!",temp);

        }
            
        else {
        Alert.alert("Fail","Incorrect code");
        }
       
    }
    
    return( 
        <SafeAreaView style={styles.container}>
            <Text style={styles.name}>Coupon Verification</Text>
            <IconInput
                
                text="Code"
                handleChange={setCode}
                
            />
            <TouchableOpacity
            onPress = {() => setTrue()}>
                
            <GradientTextButton
                text="Confirm"
                style={styles.buttonGroup}
                >  </GradientTextButton>
                </TouchableOpacity>
                <TouchableOpacity
            onPress = {() => navigation.navigate("CouponMaker")}>
                
            <GradientTextButton
                text="Coupon Maker"
                style={styles.buttonGroup}
                >  </GradientTextButton>
                </TouchableOpacity>
            

        </SafeAreaView>

       
        
        
     
    
    )
}
const styles= StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      name: {
        fontSize: 50,
        color: "white",
        width: "75%",
        
        
    },buttonGroup: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 5 },
        marginBottom: 20,
        backgroundColor: "white"
    },container: {
        backgroundColor: "#102C54",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
    },
    logo: {
        size: "45%"
    }
});

