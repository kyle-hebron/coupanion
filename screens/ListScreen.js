import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, TextInput, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ListScreen({navigation}) {
    

    
    const [input, setInput] = useState("");
    const business = [];
    async function search() {
        const q = query(collection(db, "Business people"), where("business", "==", "Wendy's"));
        const x = query(collection(db, "Business people"), where("tags", 'array-contains', input));
        let i = 0;
        const querySnapshot = await getDocs(q);
        const qSnap = await getDocs(x);
        
        const users = [];
        querySnapshot.forEach((doc) => {
            business[i] = doc.data();
            i++;
        })
        
    
        qSnap.forEach((doc) => {
            business[i] = doc.data();
            i++;
        });
        console.log("hello");
        console.log(business[1]);
        
    } 

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.textInput}>
            <Ionicons style={{fontWeight: 'bold', fontSize: 20}} name="search"/>
            <TextInput value={input} onChangeText={(text)=> setInput(text)} style={{fontSize: 15}}
            inlineImageLeft='search_icon'
            placeholder="Search Businesses"/>
            </View>
           
            
            
            <FlatList
            data={business.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem = {({item}) => {
                if(input === ""){
                    return(
                    <View style={styles.item}>
                    <Image source={item.image} style={styles.logo} />
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.tag}>{item.tag}</Text>
                    <Text style={{fontSize: 14, color:'#969696', fontWeight: 'bold'}}>{item.miles}</Text>
                    </View>
                <View style={styles.ratingContainer}>
                <Image source={item.thumb} style={styles.thumb}/>
                <Text style={{fontSize: 14, fontWeight: 'Bold'}}>{item.rating}</Text>
                </View>
                </View>
                )
            }

            if(item.name.toLowerCase().includes(input.toLowerCase())){
                return(
                <View style={styles.item}>
                <Image source={item.image} style={styles.logo} />
            <View style={styles.nameContainer}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.tag}>{item.tag}</Text>
                <Text style={{fontSize: 14, color:'#969696', fontWeight: 'bold'}}>{item.miles}</Text>
                </View>
            <View style={styles.ratingContainer}>
            <Image source={item.thumb} style={styles.thumb}/>
            <Text style={{fontSize: 14, fontWeight: 'Bold'}}>{item.rating}</Text>
            </View>
            </View>
                )
            }

            }}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 5,
        marginTop: 40,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        backgroundColor: '#DDDFE0',
        padding: 40,
        borderRadius: 40,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    nameContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    logo: {
        height: 65,
        width: 65, 
        borderRadius: 100,
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    tag: {
        fontSize: 14,
        color: '#969696',
        fontWeight: "bold"
    },
    ratingContainer:{
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    thumb: {
        height: 40,
        width: 40,
        borderRadius:100,
        backgroundColor: '#DDDFE0',
    },
    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        paddingTop: 10,
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: '#ffffff',
    },
  });
