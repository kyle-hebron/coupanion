import React, { Component, useRef, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
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
} from "react-native";
import { useRoute } from "@react-navigation/native"
import { Linking } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MapView from "react-native-maps";

//import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
//Yes, I know this is ugly -Kyle
export default function BusinessPage({ navigation }) {
	const [users, setUsers] = useState(" ");
	const [address, setAddress] = useState(" ");
	const [city, setCity] = useState(" ");
	const [number, setNumber] = useState(" ");
	const [zip, setZip] = useState(" ");
	const [state, setState] = useState(" ");
	const [pfp, setPfp] = useState(" ");
	//const [pic, setPic] = useState(" ");

	useEffect(() => {
		async function fetchData() {
			const q = query(collection(db, "Business people"));
			const querySnapshot = await getDocs(q);
			const users = [];
			querySnapshot.forEach((doc) => {
				if (doc.id === "IoIspE5aFdStSZdxETqUWLU10sS2") {
					const business = doc.data().business;
					const address = doc.data().AddressInfo.address1;
					const city = doc.data().AddressInfo.city;
					const number = doc.data().phone;
					const zip = doc.data().AddressInfo.zip;
					const state = doc.data().AddressInfo.state;
					const pfp = doc.data().pfp;
					//const pic = doc.data().pic;

					setUsers(business);
					setAddress(address);
					setCity(city);
					setNumber(number);
					setZip(zip);
					setState(state);
					setPfp(pfp);
					//setPic(pic);
				}
			});
		}
		fetchData();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
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
				<View style={styles.balloon}>
					<Image source={require("../assets/logos/wendy.png")} style={styles.logo} />
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
						<Text style={styles.name}>
							{address}
						</Text>
						<Text style={styles.name}>
							{city}, {state}, {zip}
						</Text>
						<Text
							onPress={() => {
								Linking.openURL(number);
							}}
							style={styles.name}
						>
							{number}
						</Text>
					</View>
				</View>

				<Text style={styles.titles}>Active Coupons</Text>

				<View style={{alignItems: "center"}}>
					<View style={styles.couponPack}>
						<Icon style={styles.icon} name="qrcode" size={50} color="#000"/>
						<Text style={{ fontSize: 40, textAlign: "center" }}>Coupon #1</Text>
					</View>
					<View style={styles.couponPack}>
						<Icon style={styles.icon} name="qrcode" size={50} color="#000"/>
						<Text style={{ fontSize: 40, textAlign: "center" }}>Coupon #2</Text>
					</View>
				</View>


				<TouchableOpacity
					style={{ paddingBottom: 15, flexDirection: "row-reverse" }}
					onPress={() => {
						alert("No other coupons available");
					}}
				>
					<Text style={{ fontSize: 15, color: "white", paddingHorizontal: 25 }}>
						View all
					</Text>
				</TouchableOpacity>

				<View style={{flexDirection: "column", marginBottom: 10}}>
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
					<MapView style={styles.map} />
				</View>

				<View style={{ flexDirection: "row", marginTop: 50 }}>
					<View style={styles.balloonWhite}>
						<TouchableOpacity
							style={styles.buttonGroup}
							onPress={() => {
								alert("Menu not yet available");
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
								alert("No photos available");
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

				<View style={{ marginTop: 15, alignItems: "center"}}>
					<Text style={styles.titles}>Reviews</Text>
					<View style={styles.balloonBackground}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.reviewName}>Kristen</Text>
							<Text style={styles.reviewName}> - </Text>
							<Text style={styles.reviewName}>2 weeks ago</Text>
						</View>
						<Text style={styles.reviewText}>
							I wish I could give it zero stars. The front register girl was
							probably brand new but she spoke at a whisper even after asking
							her 3 times to repeat herself. We showed patience and grace, even
							after being told they had no lettuce and finding their drink
							machine was out of almost every drink and the poor young gentleman
							behind the counter had to assist with my drink because the girl
							from before just didn't understand that the drinks were all out.
							We went to use the women's restroom before we left but the smell
							of sewer made us nearly vomit. We got out to the car only to
							discover my mothers burger was made wrong(literally had meat and a
							tomatoe since they were out of lettuce). I am extremely upset with
							this whole experience. The young guy behind the counter is the
							only person I can give props to. After we returned to get the
							burger exchanged, he was the one I saw servicing the drink
							machine. He was the one that spoke up and helped us. Everyone else
							seemed clueless or just wanted to stand behind the counter and
							watch what was happening.{" "}
						</Text>
					</View>

					<View style={styles.balloonBackground}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.reviewName}>Brian Riggers</Text>
							<Text style={styles.reviewName}> - </Text>
							<Text style={styles.reviewName}>2 years ago</Text>
						</View>
						<Text style={styles.reviewText}>
							Was standing in the lobby At 9:15 a.m.15 minutes prior to official
							opening of doors. Could not take my order for some reason. But
							tells me I can go through the drive-through.Apparently it was a
							more of a hassle for them to take my order in the lobby Then it
							would for me to get back in my Big a** truck and try to squeeze it
							through the drive-through. Took my business somewhere else. Its
							mazing how we provide business to places but the employees don't
							wanna take that little extra Effort And still wanna get paid $15
							an hour.{" "}
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={{ flexDirection: "row-reverse" }}
					onPress={() => {
						alert("No other reviews");
					}}
				>
					<Text style={{ fontSize: 15, color: "white", paddingHorizontal: 25, marginBottom: 10 }}>
						View all
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
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
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 15,
		marginBottom: 10,
		borderRadius: 20,
		width: "90%",
		flexDirection: 'row',
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
		marginLeft: 10,
		marginTop: 15,
		marginBottom: 10,
	},

	openingTimes: {
		justifyContent: 'space-between',
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
});
