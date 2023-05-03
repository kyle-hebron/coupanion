import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	getAuth,
} from "firebase/auth"
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore"
import React, { Component, useState, useEffect } from "react"

import { setBusiness } from "../components/UserDefaults"

import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native"

import GradientTextButton from "../components/GradientTextButton"
import IconInput from "../components/IconInput"
import { auth, db } from "../firebase"
import { isBusiness } from "../Helpers/dbHelper"

function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState()
	const [userData, setUserdata] = useState({})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const auth = getAuth()

	function signInUser(username, password) {
		if (auth.currentUser) {
			auth.signOut()
		}
		signInWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				// Signed in
				setLoading(true)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				setError(errorMessage)
				setLoading(false)
			})
	}

	//Once we have comfirmed that the user is signed in, we can go to the signed in screen
	onAuthStateChanged(auth, (user) => {
		if (user) {
			navigation.navigate("SignedIn")
		} else {
			console.log("User is signed out")
		}
	})

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Image
				style={styles.logo}
				source={require("../assets/Logo.png")}
			/>

			<IconInput
				icon="user-circle"
				text="Email"
				handleChange={setUsername}
				secure={false}
			/>
			<IconInput
				icon="unlock"
				text="Password"
				handleChange={setPassword}
				secure={true}
			/>

			<TouchableOpacity
				onPress={() => navigation.navigate("RegisterChoice")}
			>
				<Text style={{ color: "#949494" }}>Forgot password?</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => signInUser(username, password)}>
				<GradientTextButton
					text="Sign In"
					styles={styles}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate("RegisterChoice")}
			>
				<Text style={{ color: "#949494" }}>
					Don't have an account?{" "}
					<Text style={{ fontWeight: "bold" }}>Sign Up</Text>
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "column",
	},

	logo: {
		height: 40,
		marginBottom: 25,
		resizeMode: "contain",
	},
	text: {
		fontWeight: "bold",
		color: "white",
	},
	iconButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		marginTop: 15,
		width: "90%",
		height: 56,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 5 },
		marginBottom: 20,
	},
})

export default LoginScreen
