import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import AuthNavigator from "./navigations/AuthNavigator";

export default function App() {
	//Will do {isAuthenticed ? <BottomTabNavigator /> : <AuthNavigator />}
	return (
		<NavigationContainer>
			<AuthNavigator />
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
