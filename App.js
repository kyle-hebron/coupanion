import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterChoiceScreen from './screens/RegisterChoiceScreen';
import BusinessRegister from './screens/BusinessRegister';
import Question from './screens/Question';
import HomeScreen from './screens/HomeScreen';
import CouponMaker from './screens/CouponMaker';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterChoice" component={RegisterChoiceScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BusinessRegister" component={BusinessRegister} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CouponMaker" component={CouponMaker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'palegoldenrod',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
