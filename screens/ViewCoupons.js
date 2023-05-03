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
import { useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import IconInput from "../components/IconInput";
import GradientTextButton from "../components/GradientTextButton";
//import { text } from "stream/consumers";

const ViewCoupons = ({ navigation }) => {
	const [size, setSize] = useState(0);
	const [input, setInput] = useState("");
    var business = [];
	var listBusiness = []; 
	const [searchList, setList] = useState([]);
	const [bus, setBus] = useState([]);
	const [theCoupons, setTheCoupons] = useState([]);
	const [hasSearched, setSearch] = useState(false);
    var theBusiness;
	var temp = 0;
	var keyCount = 0;
    const route = useRoute();
	const id = route.params?.id;
    const [hasRan, setHasRan] = useState(false);

	async function search() {
        const q = query(collection(db, "Business people"));
        
        const querySnapshot = await getDocs(q);
        
        let i = 0;
        querySnapshot.forEach((doc) => {	//Need if statement to only get within a certain radius
            if (doc.id === id){
                theBusiness = doc.data();
            }
        });
    }

	useEffect(() => {
  		search()
	}, [])

	async function searchData() {
		var allCoupons = [];

		await search();

        console.log('AAAAA ' + theBusiness['Coupons']['0202']['discount']);
        console.log('BBBBB ' + Object.keys(theBusiness['Coupons']));

        var theKeys = Object.keys(theBusiness['Coupons']);

        for (var i = 0; i < Object.keys(theBusiness['Coupons']).length; i++){
            console.log(theBusiness['Coupons'][theKeys[i]]);
            allCoupons.push([theKeys[i], theBusiness['Coupons'][theKeys[i]]]);
        }

        setTheCoupons(couponItem(allCoupons));
	};

	function couponItem(coupons) {
		var listCoupons = [];
		var current;

		for (var i = 0; i < coupons.length; i++) {
			//current = businessesInfo[i][1];
			listCoupons.push(
                    <View key={keyCount} style={styles.item}>
                        <Text style={styles.couponCode}>Code: {coupons[i][0]}</Text>
                        <Text style={styles.couponTitle}>{coupons[i][1]['title']}</Text>
                        <Text style={styles.couponDesc}>{coupons[i][1]['description']}</Text>
                        <Text style={styles.couponExp}>Expires: {coupons[i][1]['expiration']}</Text>
                    </View>
				);
			keyCount++;
		}

		return listCoupons;
	}

    if (!hasRan) {
        searchData();
        setHasRan(true);
    }
	
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Coupons</Text>
					<View>
						{theCoupons}
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default ViewCoupons;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},
    item: {
		flexDirection: "column",
		alignItems: "center",
		marginVertical: 8,
		marginHorizontal: 16,
		paddingVertical: 8,
		paddingHorizontal: 33,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
	},
    couponTitle: {
        fontSize: 28,
    },
    couponDisc: {
    },
    couponDesc: {
        fontSize: 20,
    },
    couponCode: {
        fontSize: 15,
    },
    couponExp: {

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
