import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView} from 'react-native';

export default function HomeScreen({navigation}) {
  const business = [
    {
        id: 1,
        name: "Porto's Bakery",
        tag: 'Bakery',
        image: require('../assets/logos/portos.png')
    },
    {
        id: 2,
        name: "Anne's Pastries",
        tag: 'Bakery',
        image: require('../assets/logos/restuarant.png')
    },
    {
        id: 3,
        name: "The Italian",
        tag: 'Restaurant',
        image: require('../assets/logos/company.png')
    }
  ]
  const nearby = [
    {
      id: 4,
      name: "Pizza Palace",
      tag: 'Restaurant',
      image: require('../assets/logos/pizza.png')
  },
  {
      id: 5,
      name: "Olive Garden",
      tag: 'Restaurant',
      image: require('../assets/logos/olive.png')
  },
  {
      id: 6,
      name: "Lily's Flowers",
      tag: 'Shop',
      image: require('../assets/logos/flower.jpg')
  },
  ]
    return(
        <SafeAreaView style={styles.appContainer}>
          <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Discover</Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Trending</Text>
        </View>
        <FlatList
            data = {business}
            contentContainerStyle = {styles.container}
            renderItem = {({item}) => {
                    return(
                    <View style={styles.item}>
                    <Image source={item.image} style={styles.logo} />
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.tag}>{item.tag}</Text>
                    </View>
                </View>
                )
            }}/>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nearby</Text>
        </View>
        <FlatList
            data = {nearby}
            contentContainerStyle = {styles.container}
            renderItem = {({item}) => {
                    return(
                    <View style={styles.item}>
                    <Image source={item.image} style={styles.logo} />
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.tag}>{item.tag}</Text>
                    </View>
                </View>
                )
            }}/>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 30 }}>Recently Visited</Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.recentContainer}>You haven't visited any businesses recently</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    appContainer: {
      paddingTop: 20,
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
      borderColor: '#DDDFE0',
      width: '60%',
      padding: 5
    },
    boxContainer: {
      textAlign: 'center',
      textAlignVertical: 'center',
      borderWidth: 30,
      borderColor: '#DDDFE0',
      backgroundColor: '#DDDFE0',
      width: '100%'
    },
    recentContainer: {
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 30,
      borderWidth: 70,
      borderColor: '#DDDFE0',
      backgroundColor: '#DDDFE0',
      color: '#999999',
      width: '100%'
    },
    container: {
      flexDirection: 'column',
      paddingTop: 5,
  },
  nameContainer: {
      flexDirection: 'column',
      paddingLeft: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  logo: {
      height: 100,
      width: 100, 
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
  })
