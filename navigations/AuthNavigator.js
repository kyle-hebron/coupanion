import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterChoiceScreen from "../screens/RegisterChoiceScreen";
import BusinessRegister from "../screens/BusinessRegister";
import Question from "../screens/Question";
import ListScreen from "../screens/ListScreen";
import BusinessProfileScreen from "../screens/BusinessProfileScreen";
import Verify from "../screens/Verify"
import SearchScreen from "../screens/SearchScreen";
import CouponMaker from "../screens/CouponMaker";
import QuestionBusiness from "../screens/QuestionBusiness";

import BottomTabNavigator from "./BottomTabNavigator";
import BottomTabNavigatorUser from "./BottomTabNavigatorUser";

import { getData } from "../components/UserDefaults";

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
			<Stack.Screen name="Business" component={BusinessProfileScreen} />
			<Stack.Screen name="Question" component={Question} />
			<Stack.Screen name="Verify" component={Verify} />
			<Stack.Screen name="ListScreen" component={ListScreen} />
			<Stack.Screen name="SearchScreen" component={SearchScreen} />
			<Stack.Screen name="CouponMaker" component={CouponMaker} />
			<Stack.Screen name="QuestionBusiness" component={QuestionBusiness}/>
			<Stack.Screen
				name="SignedIn"
				component={
					getData("@isBusiness") == "true"
						? BottomTabNavigator
						: BottomTabNavigatorUser
				}
			/>
		</Stack.Navigator>
	);
}

export default AuthNavigator;
