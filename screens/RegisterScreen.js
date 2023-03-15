import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

import { auth, db } from "../firebase";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import GradientIconButton from "../components/GradientIconButton";
import GradientTextButton from "../components/GradientTextButton";
import IconInput from "../components/IconInput";
import { storeData } from "../components/UserDefaults";

export default function RegisterScreen({ route, navigation }) {
	const { isBusiness } = route.params;
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [image, setImage] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.top}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("RegisterChoice");
					}}
				>
					<GradientIconButton
						styles={styles}
						icon="arrow-left"
						size={30}
						color="#FFF"
					/>
				</TouchableOpacity>
			</View>
			<View styles={styles.middle}>
				<TouchableOpacity onPress={pickImage}>
					<Icon
						style={styles.profileIcon}
						name="user-circle"
						size={120}
						color="#FFF"
					/>
					{image && (
						<Image
							source={{ uri: image }}
							style={{
								width: 120,
								height: 120,
								alignSelf: "center",
								position: "absolute",
								borderRadius: 120 / 2,
							}}
						/>
					)}
				</TouchableOpacity>

				<Text style={styles.uploadText}>Upload Profile Picture</Text>

				<IconInput
					icon="user-circle"
					text="Username"
					secure={false}
					handleChange={setUsername}
				/>
				<IconInput
					icon="mail-bulk"
					text="Email"
					secure={false}
					handleChange={setEmail}
				/>
				<IconInput
					icon="unlock"
					text="Password"
					secure={true}
					handleChange={setPassword}
				/>
				<IconInput
					icon="unlock"
					text="Confirm Password"
					secure={true}
					handleChange={setConfirmPassword}
				/>
			</View>
			<View styles={styles.bottom}>
				<TouchableOpacity
					onPress={() => signUpUser(username, password, confirmPassword, email)}
				>
					<GradientTextButton
						text={isBusiness ? "Next" : "Sign Up"}
						styles={styles}
					/>
				</TouchableOpacity>
			</View>
			<Text>{error}</Text>
		</SafeAreaView>
	);

	function signUpUser(username, password, confirmPassword, email) {
		if (password === confirmPassword && password != "") {
			createUserWithEmailAndPassword(auth, email, password)
				.then((res) => {
					console.log(res.user);
					setError("");
				})
				.catch((err) => setError(err.message));
			onAuthStateChanged(auth, (user) => {
				if (user) {
					//If they're a business, register as a business
					if (isBusiness) {
						setDoc(doc(db, "Business people", user.uid), {
							uid: user.uid,
							username: username,
							email: email,
						});
						storeData("@isBusiness", "true");
						navigation.navigate("BusinessRegister");
					} else {
						setDoc(doc(db, "users", user.uid), {
							uid: user.uid,
							username: username,
							email: email,
						});
						storeData("@isBusiness", "false");
						navigation.navigate("Question");
					}
				} else {
					//console.log("No user logged in")
					//setError("No user logged in")
				}
			});
		} else {
			setError("Passwords do not match");
		}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	top: {
		alignSelf: "flex-start",
	},
	middle: {},
	title: {
		fontSize: "32",
		fontWeight: "700",
		marginTop: "5%",
		marginLeft: 15,
		marginBottom: 25,
	},
	profileIcon: {
		alignSelf: "center",
	},
	uploadText: {
		alignSelf: "center",
		marginTop: 5,
		marginBottom: 15,
		color: "#949494",
	},
});
