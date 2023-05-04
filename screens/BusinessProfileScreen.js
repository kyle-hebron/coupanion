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
	GradientTextButton,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { Linking } from "react-native"
import {
	collection,
	query,
	where,
	getDocs,
	increment,
	doc,
	getDoc,
} from "firebase/firestore"
import { db, auth, storage } from "../firebase"
import MapView, { Marker } from "react-native-maps"
import locationiq from "react-native-locationiq"
import { FlatList } from "react-native"

import { getDownloadURL, ref } from "firebase/storage"

locationiq.init("pk.ccaa34a1c14b7281d60c55ea15ce4086") // Paste the LocationIQ access token here when running .

export default function BusinessProfileScreen({ navigation }) {
	const [users, setUsers] = useState(" ")
	const [username, setUsername] = useState(" ")
	const [address, setAddress] = useState(" ")
	const [city, setCity] = useState(" ")
	const [number, setNumber] = useState(" ")
	const [zip, setZip] = useState(" ")
	const [state, setState] = useState(" ")
	const [pfp, setPfp] = useState(" ")
	const [profilePicture, setProfilePicture] = useState("")
	const [countUp, setCountUp] = useState(0) // For rating .
	const [countDown, setCountDown] = useState(0) // For rating .
	const [selected, setSelected] = useState(null) // For rating .
	const [coordinates, setCoordinates] = useState(null) // For map .
	const [coupons, setCoupons] = useState({}) // For coupons .
	const [displayedCoupons, setDisplayedCoupons] = useState([]) // For coupons .
	const route = useRoute()
	const id = route.params?.id

	async function fetchData() {
		console.log("Loading" + id)
		getDoc(doc(db, "Business people", id)).then((docSnap) => {
			if (docSnap.id === id) {
				setUsername(docSnap.data().username)
				setAddress(docSnap.data().AddressInfo.address1)
				setCity(docSnap.data().AddressInfo.city)
				setNumber(docSnap.data().phone)
				setZip(docSnap.data().AddressInfo.zip)
				setState(docSnap.data().AddressInfo.state)
				setCountUp(docSnap.data().thumbUp)
				setCountDown(docSnap.data().thumbDown)
				if (!profilePicture.length > 0) {
					setProfilePicture(
						"gs://coupanion-96203.appspot.com/images/" +
							docSnap.data().profilePicture
					)
				}
				setCoupons(docSnap.data().coupons)
				console.log(profilePicture)
				console.log(coupons)
				console.log("ZIP CODE" + zip)

				if (profilePicture.length > 0) {
					console.log("Getting profile picture")
					getProfilePicture()
				}
				if (typeof coupons !== "undefined") {
					getCoupons()
				}
			}
		})
	}

	useEffect(() => {
		fetchData()

		locationiq
			.search(`${address}, ${city}, ${state} ${zip}`)
			.then((response) => {
				const { lat, lon } = response[0]
				setCoordinates({ latitude: lat, longitude: lon })
			})
			.catch((error) => console.warn(error))
	}, [])

	function getNewCoupons() {
		getDoc(doc(db, "Business people", id)).then((docSnap) => {
			if (docSnap.exists()) {
				setCoupons(docSnap.data().coupons)
				if (typeof coupons !== "undefined") {
					getCoupons()
				}
			} else {
				console.log("No such document!")
			}
		})
	}

	//Gets the coupon list from the database and then makes sure that we are only displaying the first two coupons
	function getCoupons() {
		// If there are enough coupons, get the first two and store them in displayedCoupons
		if (typeof coupons !== "undefined") {
			if (Object.keys(coupons).length >= 2) {
				const firstTwoCoupons = [coupons[0], coupons[1]]
				setDisplayedCoupons(firstTwoCoupons)
			} else {
				setDisplayedCoupons(coupons)
			}
		}
	}

	useEffect(() => {
		getCoupons()
	}, [coupons])

	useEffect(() => {
		getProfilePicture()
	}, [profilePicture])

	async function getProfilePicture() {
		console.log("PROFILE PICTURE" + profilePicture)
		if (profilePicture.startsWith("gs://")) {
			await storage
				.refFromURL(profilePicture)
				.getDownloadURL()
				.then((url) => {
					setProfilePicture(url)
				})
		}
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
					{profilePicture.startsWith("https") ? (
						<Image
							source={{
								uri: profilePicture,
							}}
							style={styles.logo}
						/>
					) : (
						<Text>Loading...</Text>
					)}
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

				{coupons ? (
					<FlatList
						data={displayedCoupons}
						renderItem={couponItem}
						keyExtractor={(item) => item.id}
						horizontal={false}
						extraData={displayedCoupons.state}
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

				<TouchableOpacity
					style={{ paddingBottom: 15, flexDirection: "row-reverse" }}
					onPress={() => {
						navigation.navigate("ViewCoupons", {
							id: id,
						})
					}}
				>
					<Text
						style={{
							fontSize: 15,
							color: "white",
							paddingHorizontal: 25,
						}}
					>
						View all
					</Text>
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
					{coordinates && (
						<MapView
							style={styles.map}
							initialRegion={{
								latitude: coordinates.latitude,
								longitude: coordinates.longitude,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						>
							<Marker coordinate={coordinates} />
						</MapView>
					)}
				</View>

				<View style={{ flexDirection: "row", marginTop: 50 }}>
					<View style={styles.balloonWhite}>
						<TouchableOpacity
							style={styles.buttonGroup}
							onPress={() => {
								alert("Menu not yet available")
							}}
						>
							<Text
								style={{
									fontSize: 36,
									textAlign: "center",
									color: "#102C54",
									fontWeight: "bold",
								}}
							>
								Menu
							</Text>
						</TouchableOpacity>
					</View>
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

				<Text style={styles.titles}>Rating and Reviews</Text>

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

				<View style={{ marginTop: 15, alignItems: "center" }}>
					<View style={styles.balloonBackground}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.reviewName}>Kristen</Text>
							<Text style={styles.reviewName}> - </Text>
							<Text style={styles.reviewName}>2 weeks ago</Text>
						</View>
						<Text style={styles.reviewText}>
							I wish I could give it zero stars. The front
							register girl was probably brand new but she spoke
							at a whisper even after asking her 3 times to repeat
							herself. We showed patience and grace, even after
							being told they had no lettuce and finding their
							drink machine was out of almost every drink and the
							poor young gentleman behind the counter had to
							assist with my drink because the girl from before
							just didn't understand that the drinks were all out.
							We went to use the women's restroom before we left
							but the smell of sewer made us nearly vomit. We got
							out to the car only to discover my mothers burger
							was made wrong(literally had meat and a tomatoe
							since they were out of lettuce). I am extremely
							upset with this whole experience. The young guy
							behind the counter is the only person I can give
							props to. After we returned to get the burger
							exchanged, he was the one I saw servicing the drink
							machine. He was the one that spoke up and helped us.
							Everyone else seemed clueless or just wanted to
							stand behind the counter and watch what was
							happening.{" "}
						</Text>
					</View>

					<View style={styles.balloonBackground}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.reviewName}>Brian Riggers</Text>
							<Text style={styles.reviewName}> - </Text>
							<Text style={styles.reviewName}>2 years ago</Text>
						</View>
						<Text style={styles.reviewText}>
							Was standing in the lobby At 9:15 a.m.15 minutes
							prior to official opening of doors. Could not take
							my order for some reason. But tells me I can go
							through the drive-through.Apparently it was a more
							of a hassle for them to take my order in the lobby
							Then it would for me to get back in my Big a** truck
							and try to squeeze it through the drive-through.
							Took my business somewhere else. Its mazing how we
							provide business to places but the employees don't
							wanna take that little extra Effort And still wanna
							get paid $15 an hour.{" "}
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={{ flexDirection: "row-reverse" }}
					onPress={() => {
						alert("No other reviews")
					}}
				>
					<Text
						style={{
							fontSize: 15,
							color: "white",
							paddingHorizontal: 25,
							marginBottom: 10,
						}}
					>
						View all
					</Text>
				</TouchableOpacity>
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
