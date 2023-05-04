import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { getData } from "./components/UserDefaults"

import AuthNavigator from "./navigations/AuthNavigator"
import BottomTabNavigator from "./navigations/BottomTabNavigator"

import { auth, db } from "./firebase"
import BottomTabNavigatorUser from "./navigations/BottomTabNavigatorUser"

import { isBusiness } from "./Helpers/dbHelper"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"

export default function App() {
	return (
		//Checking for
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "palegoldenrod",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: "100%",
		height: "100%",
	},
})
