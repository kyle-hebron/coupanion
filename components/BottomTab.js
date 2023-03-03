import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Divider, Image } from "react-native-elements";

export const bottomTabIcons = [
	{
		name: "Home",
		active: "https://img.icons8.com/fluency-systems-filled/344/ffffff/home.png",
		inactive:
			"https://img.icons8.com/fluency-systems-regular/344/ffffff/home.png",
	},
	{
		name: "Search",
		active:
			"https://img.icons8.com/fluency-systems-filled/344/ffffff/search.png",
		inactive:
			"https://img.icons8.com/fluency-systems-regular/ffffff/344/search.png",
	},
	{
		name: "Liked",
		active: "https://img.icons8.com/ios-filled/50/ffffff/null/like--v1.png",
		inactive: "https://img.icons8.com/ios/50/ffffff/null/like--v1.png",
	},
	{
		name: "Profile",
		active: "https://img.icons8.com/fluency-systems-filled/344/ffffff/user.png",
		inactive:
			"https://img.icons8.com/fluency-systems-regular/344/ffffff/user.png",
	},
];

const BottomTab = ({ icons }) => {
	const [activeTab, setActiveTab] = useState("Home");

	const Icon = ({ icon }) => (
		<TouchableOpacity onPress={() => setActiveTab(icon.name)}>
			<Image
				source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }}
				style={styles.icon}
			/>
		</TouchableOpacity>
	);

	return (
		<View styles={styles.wrapper}>
			<Divider width={1} orientation="vertical" />
			<View style={styles.container}>
				{icons.map((icon, index) => (
					<Icon key={index} icon={icon} />
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		width: "100%",
		bottom: "3%",
		zIndex: 999,
		backgroundColor: "black",
	},

	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		height: 50,
		paddingTop: 20,
	},

	icon: {
		width: 30,
		height: 30,
	},
});

export default BottomTab;
