import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
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
	const [size, setSize] = useState(0);
	const [input, setInput] = useState("");
    const business = [];
	var listBusiness = []; 
	const [searchList, setList] = useState([ ]);
	const [bus, setBus] = useState([]);
	const [hasSearched, setSearch] = useState(false);
	var temp = 0;
	useEffect(() => {
	async function search() {
        const q = query(collection(db, "Business people"));
        
        
		
        const querySnapshot = await getDocs(q);
        
        
        let i = 0;
        querySnapshot.forEach((doc) => {	//Need if statement to only get within a certain radius
            business[i] = doc.data();
            i++;
			setSize(i);
			setList(business);
        });
        
    
        
		
		console.log(searchList[16].business);
		
    } search();
}, []);
	function searchData(){
		setSearch(false);
		var tempBus = [];
		for(let i = 0; i < size; i++){
			if(searchList[i].business == input && searchList[i].uid != undefined){
				tempBus.push({ id: temp++,
					"name": searchList[i].business,
					"userID": searchList[i].uid
					
				})
			}
		}
		listBusiness = tempBus;
		temp = 0;
		console.log(listBusiness);
		setSearch(true);
	};
	
	const renderItem = ({ item, index }) => (
		
		<TouchableOpacity
			onPress={() => navigation.navigate("Business", { id: item.id })}
		>
			<View style={styles.item}>
				<Image source={item.image} style={styles.logo} />
				<View style={styles.nameContainer}>
					<Text style={styles.text}>{item.name}</Text>
					
				</View>
			</View>
		</TouchableOpacity>
	);
	
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Search</Text>
					<View style={styles.searchSection}>
						
						<IconInput text="Code"
							handleChange={setInput}
							/>
						<TouchableOpacity onPress={() => searchData()}>
							<Icon style={styles.icon} name="search" size={30} color="#FFF" />
						</TouchableOpacity>
						<Text>Hello</Text>
						           
					</View>
					<View>
						{hasSearched ? <Text>{listBusiness[0].name}</Text>: <></>}
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
