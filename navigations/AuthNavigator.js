import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterChoiceScreen from "../screens/RegisterChoiceScreen";
import BusinessRegister from "../screens/BusinessRegister";
import Question from "../screens/Question";

import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
	return (
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
			<Stack.Screen name="SignedIn" component={BottomTabNavigator} />
		</Stack.Navigator>
	);
}

export default AuthNavigator;
