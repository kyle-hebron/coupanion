import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { getData } from "./components/UserDefaults"

import AuthNavigator from "./navigations/AuthNavigator"
import BottomTabNavigator from "./navigations/BottomTabNavigator"

import { auth } from "./firebase"
import BottomTabNavigatorUser from "./navigations/BottomTabNavigatorUser"

import { isBusiness } from "./Helpers/dbHelper"

export default function App() {
	//Checks if there is a user signed in or not

	return (
		//Checking for
		<NavigationContainer>
			{auth.currentUser ? (
				isBusiness() ? (
					<BottomTabNavigatorUser />
				) : (
					<BottomTabNavigator />
				)
			) : (
				<AuthNavigator />
			)}
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
