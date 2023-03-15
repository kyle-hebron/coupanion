import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import GradientIconButton from "../components/GradientIconButton";

const SearchScreen = ({ navigation }) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Search</Text>
					<View style={styles.searchSection}>
						<TextInput
							placeholder="Search for 'Chinese food'"
							style={styles.input}
						/>
						<TouchableOpacity>
							<Icon style={styles.icon} name="search" size={30} color="#FFF" />
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 25,
		paddingVertical: 0,
		borderRadius: 100,
		width: "90%",
		paddingVertical: 15,
	},
	searchSection: {
		flexDirection: "row",
		width: "90%",
		marginTop: 5,
		marginLeft: 15,
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 36,
		marginLeft: 15,
		marginTop: 30,
		borderRadius: 100,
	},
	icon: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 50,
		height: 30,
		paddingHorizontal: 10,
	},
});
