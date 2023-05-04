import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	ScrollView,
	Button,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { Linking } from "react-native"
import {
	collection,
	query,
	where,
	getDocs,
	increment,
} from "firebase/firestore"
import { db } from "../firebase"
import MapView, { Marker } from "react-native-maps"
import locationiq from "react-native-locationiq"
import GradientTextButton from "../components/GradientTextButton"

locationiq.init("LocationIQ_Acess_Token") // Paste the LocationIQ access token here when running .

export default function BusinessProfileScreen({ navigation }) {
	const [users, setUsers] = useState(" ")
	const [address, setAddress] = useState(" ")
	const [city, setCity] = useState(" ")
	const [number, setNumber] = useState(" ")
	const [zip, setZip] = useState(" ")
	const [state, setState] = useState(" ")
	const [pfp, setPfp] = useState(" ")
	const [pic, setPic] = useState(" ")
	const [countUp, setCountUp] = useState(0) // For rating .
	const [countDown, setCountDown] = useState(0) // For rating .
	const [selected, setSelected] = useState(null) // For rating .
	const [coordinates, setCoordinates] = useState(null) // For map .
	const route = useRoute()
	const id = route.params?.id

	useEffect(() => {
		async function fetchData() {
			const q = query(collection(db, "Business people"))
			const querySnapshot = await getDocs(q)
			const users = []
			querySnapshot.forEach((doc) => {
				if (doc.id === id) {
					const business = doc.data().business
					const address = doc.data().AddressInfo.address1
					const city = doc.data().AddressInfo.city
					const number = doc.data().phone
					const zip = doc.data().AddressInfo.zip
					const state = doc.data().AddressInfo.state
					const pfp = doc.data().pfp
					const countUp = doc.data().thumbUp
					const countDown = doc.data().thumbDown
					const pic = { uri: doc.data().image }

					setUsers(business)
					setAddress(address)
					setCity(city)
					setNumber(number)
					setZip(zip)
					setState(state)
					setPfp(pfp)
					setCountUp(countUp)
					setCountDown(countDown)
					setPic(pic)

					// Call LocationIQ API to convert address to coordinates .
					locationiq
						.search(`${address}, ${city}, ${state} ${zip}`)
						.then((response) => {
							const { lat, lon } = response[0]
							setCoordinates({ latitude: lat, longitude: lon })
						})
						.catch((error) => console.warn(error))
				}
			})
		}
		fetchData()
	}, [])

	// A function to handle upvotes and downvotes , and to update the count of each accordingly .
	const handleVote = (type) => {
		if (type === selected) {
			setSelected(null)
			if (type === "up") {
				setCountUp(countUp - 1)
				db.collection("Business people")
					.doc(id)
					.update({ thumbUp: increment(-1) })
			} else {
				setCountDown(countDown - 1)
				db.collection("Business people")
					.doc(id)
					.update({ thumbDown: increment(-1) })
			}
		} else {
			setSelected(type)
			if (type === "up") {
				setCountUp(countUp + 1)
				db.collection("Business people")
					.doc(id)
					.update({ thumbUp: increment(1) })
				if (selected === "down") {
					setCountDown(countDown - 1)
					db.collection("Business people")
						.doc(id)
						.update({ thumbDown: increment(-1) })
				}
			} else {
				setCountDown(countDown + 1)
				db.collection("Business people")
					.doc(id)
					.update({ thumbDown: increment(1) })
				if (selected === "up") {
					setCountUp(countUp - 1)
					db.collection("Business people")
						.doc(id)
						.update({ thumbUp: increment(-1) })
				}
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack()
						}}
					>
						<Icon
							name="arrow-left"
							size={30}
							color="white"
							style={{
								marginLeft: 20,
								marginTop: 0,
							}}
						/>
					</TouchableOpacity>
					<Text
						style={{
							fontSize: 32,
							textAlign: "left",
							margin: 0,
							fontWeight: "bold",
							color: "white",
							paddingLeft: 10,
						}}
					>
						Profile
					</Text>
				</View>
				<View style={styles.balloon}>
					<Image
						source={pic}
						style={styles.logo}
					/>
					<View style={{ paddingHorizontal: 15 }}>
						<Text
							style={{
								fontSize: 20,
								color: "white",
								fontWeight: "bold",
							}}
						>
							{users}
						</Text>
						<Text style={styles.name}>{address}</Text>
						<Text style={styles.name}>
							{city}, {state}, {zip}
						</Text>
						<Text
							onPress={() => {
								Linking.openURL(number)
							}}
							style={styles.name}
						>
							{number}
						</Text>
					</View>
				</View>

				<Text style={styles.titles}>Active Coupons</Text>

				<TouchableOpacity onPress={() => navigation.navigate("ViewCoupons", { id: id })}>
					<GradientTextButton
						text="View Coupons"
						styles={styles}
					/>
				</TouchableOpacity>

				<View style={{ flexDirection: "column", marginBottom: 10 }}>
					<Text style={styles.titles}>Hours:</Text>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Sunday </Text>

						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Monday </Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Tuesday </Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Wednesday</Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Thursday </Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Friday </Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
					<View style={styles.openingTimes}>
						<Text style={styles.time}>Sunday </Text>
						<Text> </Text>
						<Text style={styles.time}>6:30AM - 12:00AM</Text>
					</View>
				</View>

				<Text style={styles.titles}>Find us</Text>
				<View style={{ flex: 1, height: 250 }}>
					<MapView style={styles.map}>
						{coordinates && <Marker coordinate={coordinates} />}
					</MapView>
				</View>

				<View style={{ flexDirection: "row", marginTop: 50, justifyContent: "center" }}>
					<View style={styles.balloonWhite}>
						<TouchableOpacity
							style={styles.buttonGroup}
							onPress={() => {
								alert("No photos available")
							}}
						>
							<Text
								style={{
									fontSize: 36,
									textAlign: "auto",
									color: "#102C54",
									fontWeight: "bold",
								}}
							>
								Photos
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.titles}>Rating</Text>

				<View style={styles.rating}>
					<TouchableOpacity onPress={() => handleVote("up")}>
						<Icon
							name="thumbs-up"
							size={35}
							color={selected === "up" ? "green" : "black"}
						/>
					</TouchableOpacity>
					<Text style={styles.count}>{countUp}</Text>
					<TouchableOpacity onPress={() => handleVote("down")}>
						<Icon
							name="thumbs-down"
							size={35}
							color={selected === "down" ? "red" : "black"}
						/>
					</TouchableOpacity>
					<Text style={styles.count}>{countDown}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},

	logo: {
		width: 100,
		height: 100,
		borderRadius: 100,
	},

	name: {
		fontSize: 15,
		color: "white",
		width: "100%",
	},

	balloon: {
		marginLeft: 15,
		paddingTop: 10,
		paddingBottom: 15,
		flexDirection: "row",
		alignItems: "center",
	},

	couponPack: {
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 15,
		marginBottom: 10,
		borderRadius: 20,
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
	},

	buttonGroup: {
		alignItems: "center",
		width: "100%",

		backgroundColor: "#ffffff",
		borderRadius: 100,
	},

	balloonWhite: {
		paddingHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 15,
		flexDirection: "row",
		width: "50%",
	},

	balloonBackground: {
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 20,
		backgroundColor: "white",
		marginBottom: 10,
		width: "90%",
	},

	time: {
		fontSize: 20,
		textAlign: "auto",
		color: "#ffffff",
	},

	titles: {
		textAlign: "center",
		fontSize: 32,
		color: "white",
		fontWeight: "bold",
		marginTop: 15,
		marginBottom: 10,
	},

	openingTimes: {
		justifyContent: "space-between",
		flexDirection: "row",
		paddingHorizontal: 20,
		marginLeft: 10,
		marginRight: 10,
	},

	reviewText: {
		fontSize: 20,
		textAlign: "auto",
		color: "#102C54",
	},

	reviewName: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "auto",
		color: "#102C54",
		flexDirection: "row",
	},
	map: {
		marginTop: 5,
		width: "95%",
		height: "100%",
		alignSelf: "center",
		borderRadius: 25,
	},
	rating: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingHorizontal: 25,
		paddingVertical: 10,
	},
	count: {
		fontSize: 10,
		color: "white",
	},
})
