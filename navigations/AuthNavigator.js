import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useState, useEffect } from "react"

import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import RegisterChoiceScreen from "../screens/RegisterChoiceScreen"
import BusinessRegister from "../screens/BusinessRegister"
import Question from "../screens/Question"
import ListScreen from "../screens/ListScreen"
import BusinessPage from "../screens/BusinessPage"
import Verify from "../screens/Verify"
import SearchScreen from "../screens/SearchScreen"
import CouponMaker from "../screens/CouponMaker"

import BottomTabNavigator from "./BottomTabNavigator"
import BottomTabNavigatorUser from "./BottomTabNavigatorUser"

import { isBusiness } from "../Helpers/dbHelper"

import { auth } from "../firebase"

const Stack = createNativeStackNavigator()

function AuthNavigator() {
	const [isABusiness, setIsABusiness] = useState(false)
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
				name="SignedIn"
				component={BottomTabNavigator}
			/>
		</Stack.Navigator>
	)
}

export default AuthNavigator
