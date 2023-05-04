import { LinearGradient } from "expo-linear-gradient"
import React, { useState, useEffect } from "react"
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
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import GradientIconButton from "../components/GradientIconButton"
import { useRoute } from "@react-navigation/native"
import { collection, query, where, getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import IconInput from "../components/IconInput"
import GradientTextButton from "../components/GradientTextButton"
//import { text } from "stream/consumers";

const ViewCoupons = ({ navigation }) => {
	const [size, setSize] = useState(0)
	const [input, setInput] = useState("")
	var business = []
	var listBusiness = []
	const [searchList, setList] = useState([])
	const [bus, setBus] = useState([])
	const [theCoupons, setTheCoupons] = useState({})
	const [hasSearched, setSearch] = useState(false)
	var theBusiness
	var temp = 0
	var keyCount = 0
	const route = useRoute()
	const id = route.params?.id
	console.log(id)
	const [hasRan, setHasRan] = useState(false)

	useEffect(() => {
		getNewCoupons()
		console.log(theCoupons)
	}, [id])

	function getNewCoupons() {
		getDoc(doc(db, "Business people", id)).then((docSnap) => {
			if (docSnap.exists()) {
				setTheCoupons(docSnap.data().coupons)
			} else {
				console.log("No such document!")
			}
		})
	}

	const couponItem = ({ item }) => (
		<View
			style={{
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				backgroundColor: "#fff",
				margin: 10,
				padding: 20,
				borderRadius: 10,
			}}
		>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				<Icon
					style={{
						paddingRight: 10,
					}}
					name="qrcode"
					size={50}
					color="#000"
				/>
				<Text
					style={{
						fontSize: 40,
						textAlign: "center",
						paddingRight: 10,
					}}
				>
					{item.title}
				</Text>
			</View>
			<Text>{item.expiration}</Text>
		</View>
	)

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Coupons</Text>
					{theCoupons ? (
						<FlatList
							data={theCoupons}
							renderItem={couponItem}
							keyExtractor={(item) => item.id}
							horizontal={false}
						/>
					) : (
						<Text
							style={{
								color: "white",
								textAlign: "center",
								fontSize: 20,
							}}
						>
							No coupons available
						</Text>
					)}
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

export default ViewCoupons

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
	couponDisc: {},
	couponDesc: {
		fontSize: 20,
	},
	couponCode: {
		fontSize: 15,
	},
	couponExp: {},
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
})
