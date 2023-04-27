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
import GradientTextButton from "../components/GradientTextButton";
//import { text } from "stream/consumers";

const SearchScreen = ({ navigation }) => {
	const [size, setSize] = useState(0);
	const [input, setInput] = useState("");
    var business = [];
	var listBusiness = []; 
	const [searchList, setList] = useState([]);
	const [bus, setBus] = useState([]);
	const [businesses, setBusinesses] = useState([]);
	const [hasSearched, setSearch] = useState(false);
	var temp = 0;
	var keyCount = 0;

	async function search() {
        const q = query(collection(db, "Business people"));
        
        const querySnapshot = await getDocs(q);
        
        let i = 0;
        querySnapshot.forEach((doc) => {	//Need if statement to only get within a certain radius
            business[i] = [doc.data(), doc.id];
            i++;
			setSize(i);
			setList(business);
        });
    }

	useEffect(() => {
  		search()
	}, [])

	async function searchData() {
		var allBusinesses = [];

		await search();

		for (let i = 0; i < size; i++) {
			if (business[i][0]['business'] != undefined) {
				allBusinesses.push([business[i][0]['business'], business[i][1]]);
			}
		}

		//setBusinesses(businessItem(allBusinesses));
		var temp1 = searchBusinesses(allBusinesses, input.toLowerCase());
		var temp2 = businessItem(temp1);


		setBusinesses(temp2);
		console.log('BOOOOOOP' + businesses);
	};

	function businessItem(businessesInfo) {
		var listBusiness = [];
		var current;

		for (var i = 0; i < businessesInfo.length; i++) {
			current = businessesInfo[i][1];
			listBusiness.push(
					<TouchableOpacity key={keyCount} onPress={() => navigation.navigate("Business", { id: current })}>
						<GradientTextButton text={businessesInfo[i][0]} />
					</TouchableOpacity>
				);
			keyCount++;
		}

		return listBusiness;
	}

	function searchBusinesses(allBusinesses, searchText) {
		var trueBusinesses = [];
		for(let i = 0; i < allBusinesses.length; i++) {
			if ((allBusinesses[i][0].toLowerCase()).includes(searchText)) {
				trueBusinesses.push([allBusinesses[i][0], allBusinesses[i][1]]);
			}
		}
		
		return trueBusinesses;
	}
	
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Search</Text>
					<View style={styles.searchSection}>
						
						<IconInput text="Search"
							handleChange={setInput}
							/>
						<TouchableOpacity onPress={() => searchData()}>
							<Icon style={styles.icon} name="search" size={30} color="#FFF" />
						</TouchableOpacity>
					</View>
					<View>
						{businesses}
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
