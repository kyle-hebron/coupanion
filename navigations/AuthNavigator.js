import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useState, useEffect } from "react"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import RegisterChoiceScreen from "../screens/RegisterChoiceScreen"
import BusinessRegister from "../screens/BusinessRegister"
import Question from "../screens/Question"
import ListScreen from "../screens/ListScreen"
import BusinessPage from "../screens/BusinessProfileScreen"
import Verify from "../screens/Verify"
import SearchScreen from "../screens/SearchScreen"
import CouponMaker from "../screens/CouponMaker"
import QuestionBusiness from "../screens/QuestionBusiness"

import BottomTabNavigator from "./BottomTabNavigator"
import BottomTabNavigatorUser from "./BottomTabNavigatorUser"

import { isBusiness } from "../Helpers/dbHelper"

import { auth, db } from "../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useIsFocused } from "@react-navigation/native"
import { onAuthStateChanged } from "firebase/auth"

const Stack = createNativeStackNavigator()

function AuthNavigator() {
	const [isABusiness, setIsABusiness] = useState(false)

	onAuthStateChanged(auth, (user) => {
		if (user) {
			checkBusiness()
		} else {
			console.log("User is signed out")
		}
	})

	//Checks if there is a user signed in or not
	async function checkBusiness() {
		if (await auth.currentUser) {
			await getDoc(doc(db, "users", auth.currentUser.uid)).then(
				(docSnap) => {
					if (docSnap.exists()) {
						console.log("User found!")
						setIsABusiness(false)
					} else {
						console.log("No user found!")
					}
				}
			)

			await getDoc(doc(db, "Business people", auth.currentUser.uid)).then(
				(docSnap) => {
					if (docSnap.exists()) {
						console.log("Business found!")
						setIsABusiness(true)
					} else {
						console.log("No business found!")
					}
				}
			)
		}
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Login"
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
			/>
			<Stack.Screen
				name="RegisterChoice"
				component={RegisterChoiceScreen}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
			/>
			<Stack.Screen
				name="BusinessRegister"
				component={BusinessRegister}
			/>
			<Stack.Screen
				name="Question"
				component={Question}
			/>

			<Stack.Screen
				name="QuestionBusiness"
				component={QuestionBusiness}
			/>

			<Stack.Screen
				name="SignedIn"
				component={
					isABusiness ? BottomTabNavigator : BottomTabNavigatorUser
				}
			/>
		</Stack.Navigator>
	)
}

export default AuthNavigator
