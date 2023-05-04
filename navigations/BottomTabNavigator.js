import Ionicons from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BusinessProfileScreen from "../screens/BusinessProfileScreen"
import CouponMaker from "../screens/CouponMaker"
import BusinessPage from "../screens/BusinessPage"
import Verify from "../screens/Verify"
import SettingScreen from "../screens/SettingScreen"
import LoginScreen from "../screens/LoginScreen"
import ViewCoupons from "../screens/ViewCoupons"

import { getBusiness } from "../components/UserDefaults"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabView() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName

					if (route.name === "Verify") {
						iconName = focused ? "checkmark" : "checkmark-outline"
					} else if (route.name === "CouponMaker") {
						iconName = focused ? "add-circle" : "add-circle-outline"
					} else if (route.name === "Profile") {
						iconName = focused
							? "person-circle"
							: "person-circle-outline"
					}

					return (
						<Ionicons
							name={iconName}
							size={size}
							color={color}
						/>
					)
				},
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
			})}
			initialRouteName="Home"
		>
			<Tab.Screen
				name="CouponMaker"
				component={CouponMaker}
			/>
			<Tab.Screen
				name="Profile"
				component={BusinessPage}
			/>
			<Tab.Screen
				name="Verify"
				component={Verify}
			/>
		</Tab.Navigator>
	)
}

function BottomTabNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="TabView"
		>
			<Stack.Screen
				name="Settings"
				component={SettingScreen}
			/>
			<Stack.Screen
				name="ViewCoupons"
				component={ViewCoupons}
			/>
			<Stack.Screen
				name="Business"
				component={BusinessProfileScreen}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
			/>
			<Stack.Screen
				name="TabView"
				component={TabView}
			/>
		</Stack.Navigator>
	)
}

export default BottomTabNavigator
