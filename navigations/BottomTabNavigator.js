import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BusinessPage from "../screens/BusinessPage";
import CouponMaker from "../screens/CouponMaker";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
			})}
			initialRouteName="Home"
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="CouponMaker" component={CouponMaker} />
			<Tab.Screen name="Business" component={BusinessPage} />
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;
