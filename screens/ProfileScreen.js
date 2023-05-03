import React, { useEffect, useState, useRef } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	Button,
	GradientTextButton,
	Alert,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { Linking } from "react-native"
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	doc,
} from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { getDownloadURL, ref } from "firebase/storage"

import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

export default function ProfileScreen({ navigation }) {
	const [username, setUsername] = useState("")
	const [profilePicture, setProfilePicture] = useState("")
	const [pfpUrl, setPfpUrl] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
				if (docSnap.exists()) {
					setUsername(docSnap.data().username)
					setProfilePicture("images/" + docSnap.data().profilePicture)
				} else {
					console.log("No such document!")
				}
			})
		}

		fetchData()
		// Make sure the profile picture is actually loaded otherwise an error will be thrown
		if (!profilePicture.startsWith("images/")) {
			const fileRef = ref(storage, profilePicture)
			getDownloadURL(fileRef).then((url) => {
				setPfpUrl(url)
				console.log(pfpUrl)
			})
		}
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingEnd: 15,
					}}
				>
					<Text
						style={{
							fontSize: 32,
							textAlign: "left",
							margin: 0,
							fontWeight: "bold",
							color: "white",
							marginLeft: 15,
						}}
					>
						Profile
					</Text>
					<TouchableOpacity
						style={{
							marginLeft: 15,
							backgroundColor: "white",
							width: 40,
							height: 40,
							borderRadius: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => {
							navigation.push("Settings")
						}}
					>
						<Icon
							style={{
								fontSize: 25,
								color: "black",
								marginRight: 0,
								padding: 0,
							}}
							name="cog"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.balloon}>
					<Image
						source={{ uri: pfpUrl }}
						style={styles.logo}
					/>

					<View style={{ paddingHorizontal: 15 }}>
						<Text
							style={{
								fontSize: 24,
								color: "white",
								fontWeight: "bold",
							}}
						>
							@{username}
						</Text>
					</View>
				</View>

				<Text style={styles.titles}>Recently used</Text>

				<View style={{ alignItems: "center" }}>
					<View style={styles.couponPack}>
						<Icon
							style={styles.icon}
							name="qrcode"
							size={50}
							color="#000"
						/>
						<Text style={{ fontSize: 40, textAlign: "center" }}>
							Coupon #1
						</Text>
					</View>
					<View style={styles.couponPack}>
						<Icon
							style={styles.icon}
							name="qrcode"
							size={50}
							color="#000"
						/>
						<Text style={{ fontSize: 40, textAlign: "center" }}>
							Coupon #2
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={{ paddingBottom: 15, flexDirection: "row-reverse" }}
					onPress={() => {
						alert("No other coupons available")
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
		alignItems: "left",
		fontSize: 32,
		color: "white",
		fontWeight: "bold",
		marginLeft: 15,
		marginBottom: 10,
	},
})
