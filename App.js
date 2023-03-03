import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterChoiceScreen from "./screens/RegisterChoiceScreen";
import BusinessRegister from "./screens/BusinessRegister";
import Question from "./screens/Question";
import HomeScreen from "./screens/HomeScreen";
import BusinessPage from "./screens/BusinessPage";
import CouponMaker from "./screens/CouponMaker";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SignedInStack() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "CouponMaker") {
						iconName = focused ? "add-circle" : "add-circle-outline";
					} else if (route.name === "Business") {
						iconName = focused ? "person-circle" : "person-circle-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
			})}
			initialRouteName="Login"
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="CouponMaker" component={CouponMaker} />
			<Tab.Screen name="Business" component={BusinessPage} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Login"
			>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="RegisterChoice" component={RegisterChoiceScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="BusinessRegister" component={BusinessRegister} />
				<Stack.Screen name="Question" component={Question} />
				<Stack.Screen name="SignedIn" component={SignedInStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "palegoldenrod",
		alignItems: "center",
		justifyContent: "center",
	},
});
