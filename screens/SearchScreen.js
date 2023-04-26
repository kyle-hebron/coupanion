import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
	
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import GradientIconButton from "../components/GradientIconButton";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import IconInput from "../components/IconInput";

const SearchScreen = ({ navigation }) => {
	const [input, setInput] = useState("");
    const business = [];
	const [searchList, setList] = useState([ ]);
	async function search() {
        const q = query(collection(db, "Business people"), where("business", "==", input));
        const x = query(collection(db, "Business people"), where("tags", 'array-contains', input));
        let i = 0;
		
        const querySnapshot = await getDocs(q);
        const qSnap = await getDocs(x);
        
        
        querySnapshot.forEach((doc) => {
            business[i] = doc.data();
            i++;
        })
        
    
        qSnap.forEach((doc) => {
            business[i] = doc.data();
            i++;
        });
		setList(business);
		
    } 

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Search</Text>
					<View style={styles.searchSection}>
						
						<IconInput text="Code"
							handleChange={setInput}
							/>
						<TouchableOpacity onPress={() => search()}>
							<Icon style={styles.icon} name="search" size={30} color="#FFF" />
						</TouchableOpacity>
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
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 25,
		paddingVertical: 0,
		borderRadius: 100,
		width: "90%",
		paddingVertical: 15,
	},
	searchSection: {
		flexDirection: "row",
		width: "90%",
		marginTop: 5,
		marginLeft: 15,
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 36,
		marginLeft: 15,
		marginTop: 30,
		borderRadius: 100,
	},
	icon: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 50,
		height: 30,
		paddingHorizontal: 10,
	},
});
