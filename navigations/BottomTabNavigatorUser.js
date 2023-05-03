import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BusinessPage from "../screens/BusinessPage";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { getData } from "../components/UserDefaults";

const Tab = createBottomTabNavigator();

function BottomTabNavigatorUser() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "person-circle" : "person-circle-outline";
					} else if (route.name === "Search") {
						iconName = focused ? "search-outline" : "search";
					}
						
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
			})}
			initialRouteName="Home"
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}

export default BottomTabNavigatorUser;
