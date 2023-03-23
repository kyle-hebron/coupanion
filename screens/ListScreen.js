import * as React from 'react';
import { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListScreen({navigation}) {
    const business = [
        {
            id: 1,
            name: "Porto's Bakery",
            tag: 'Bakery',
            rating: '90%',
            miles: '1.1mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/portos.png')
        },
        {
            id: 2,
            name: "Anne's Pastries",
            tag: 'Bakery',
            rating: '75%',
            miles: '1.5mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/restuarant.png')
        },
        {
            id: 3,
            name: "The Italian",
            tag: 'Restaurant',
            rating: '80%',
            miles: '1.8mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/company.png')
        },
        {
            id: 4,
            name: "Pizza Palace",
            tag: 'Restaurant',
            rating: '60%',
            miles: '0.6mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/pizza.png')
        },
        {
            id: 5,
            name: "Olive Garden",
            tag: 'Restaurant',
            rating: '45%',
            miles: '2.2mi',
            thumb: require('../../assets/thumbDown.png'),
            image: require('../../assets/logos/olive.png')
        },
        {
            id: 6,
            name: "Lily's Flowers",
            tag: 'Shop',
            rating: '85%',
            miles: '1.5mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/flower.jpg')
        },
        {
            id: 7,
            name: "Jollibee",
            tag: 'Fast Food',
            rating: '70%',
            miles: '3.4mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/Jolibee.png')
        },
        {
            id: 8,
            name: "Spicy Thai",
            tag: 'Reastaurant',
            rating: '65%',
            miles: '2.6mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/thai.png')
        },
        {
            id: 9,
            name: "Mexican Grill",
            tag: 'Restuarant',
            rating: '75%',
            miles: '4.1mi',
            thumb: require('../../assets/thumbUp.png'),
            image: require('../../assets/logos/mexican.jpg')
        },
        {
            id: 10,
            name: "McDonalds",
            tag: 'Fast Food',
            rating: '30%',
            miles: '0.3mi',
            thumb: require('../../assets/thumbDown.png'),
            image: require('../../assets/logos/mcdonalds.png')
        },
    ];
    const [input, setInput] = useState("");
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
