import React, { Component, useRef, useEffect } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	ScrollView,
	TouchableOpacity,
	Animated,
} from "react-native";
import MultiSelect from "react-native-multiple-select";

import GradientTextButton from "../components/GradientTextButton";
import IconInput from "../components/IconInput";

const clothingItemsList = [
	{
		id: "a0",
		name: "Clothing",
	},
	{
		id: "a1",
		name: "Shoes",
	},
	{
		id: "a2",
		name: "Jewelry",
	},
	{
		id: "a3",
		name: "Pet",
	},
	{
		id: "a4",
		name: "Home Improvement",
	},
	{
		id: "a5",
		name: "Grocery",
	},
	{
		id: "a6",
		name: "Toy",
	},
	{
		id: "a7",
		name: "Weed",
	},
	{
		id: "a8",
		name: "Gas",
	},
	{
		id: "a9",
		name: "Hobby",
	},
	{
		id: "a10",
		name: "Collectible",
	},
	{
		id: "a11",
		name: "Tech",
	},
	{
		id: "a12",
		name: "Beauty",
	},
];

const foodItemsList = [
	{
		id: "b0",
		name: "Japanese",
	},
	{
		id: "b1",
		name: "American",
	},
	{
		id: "b2",
		name: "Korean",
	},
	{
		id: "b3",
		name: "Hawaiian",
	},
	{
		id: "b4",
		name: "Italian",
	},
	{
		id: "b5",
		name: "Chinese",
	},
	{
		id: "b6",
		name: "AYCE",
	},
	{
		id: "b7",
		name: "Vegan",
	},
	{
		id: "b8",
		name: "Halal",
	},
	{
		id: "b9",
		name: "Alcohol",
	},
];

const entItemsList = [
	{
		id: "c0",
		name: "Bowling",
	},
	{
		id: "c1",
		name: "Mini Golf",
	},
	{
		id: "c2",
		name: "Movies",
	},
	{
		id: "c3",
		name: "Go Kart",
	},
	{
		id: "c4",
		name: "Shooting Range",
	},
];

const FadeInView = (props) => {
	const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 3690,
		}).start();
	}, [fadeAnim]);

	return (
		<Animated.View // Special animatable View
			style={{
				...props.style,
				opacity: fadeAnim, // Bind opacity to animated value
			}}
		>
			{props.children}
		</Animated.View>
	);
};

class Question extends Component {
	state = {
		value: 25,
		priceValue: 15,
		clothingItems: [],
		foodItems: [],
		entItems: [],
	};

	onClothingItemsChange = (clothingItems) => {
		this.setState({ clothingItems });
	};

	onFoodItemsChange = (foodItems) => {
		this.setState({ foodItems });
	};

	onEntItemsChange = (entItems) => {
		this.setState({ entItems });
	};

	render() {
		const { clothingItems } = this.state;
		const { foodItems } = this.state;
		const { entItems } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<View style={{ flex: 1 }}>
						<FadeInView>
							<Text
								style={{
									fontSize: 45,
									textAlign: "center",
									margin: 10,
									fontWeight: "bold",
									color: "#FFFFFF"
								}}
							>
								Welcome to Coupanion
							</Text>
						</FadeInView>
					</View>

					<View style={{ flex: 1 }}>
						<FadeInView>
							<View style={styles.innerContainer}>
								<View style={styles.multiSelectContainer}>
									<View
										style={[styles.balloon, { backgroundColor: "#FFFFFF" }]}
									>
										<Text style={styles.baseText}>Shopping</Text>
										<MultiSelect
											items={clothingItemsList}
											uniqueKey="id"
											onSelectedItemsChange={this.onClothingItemsChange}
											selectedItems={clothingItems}
											selectText="Pick Items"
											searchInputPlaceholderText="Search Items..."
											onChangeInput={(text) => console.warn(text)}
											tagRemoveIconColor="#CCC"
											tagBorderColor="black"
											tagTextColor="black"
											selectedItemTextColor="#CCC"
											selectedItemIconColor="#CCC"
											itemTextColor="#000"
											displayKey="name"
											searchInputStyle={{ color: "#CCC" }}
											submitButtonColor="#CCC"
											submitButtonText="Submit"
											removeSelected
										/>
									</View>
									<Text />
									<View
										style={[styles.balloon, { backgroundColor: "#FFFFFF" }]}
									>
										<Text style={styles.baseText}>Food</Text>
										<MultiSelect
											items={foodItemsList}
											uniqueKey="id"
											onSelectedItemsChange={this.onFoodItemsChange}
											selectedItems={foodItems}
											selectText="Pick Items"
											searchInputPlaceholderText="Search Items..."
											onChangeInput={(text) => console.warn(text)}
											tagRemoveIconColor="#CCC"
											tagBorderColor="black"
											tagTextColor="black"
											selectedItemTextColor="#CCC"
											selectedItemIconColor="#CCC"
											itemTextColor="#000"
											displayKey="name"
											searchInputStyle={{ color: "#CCC" }}
											submitButtonColor="#CCC"
											submitButtonText="Submit"
											removeSelected
										/>
									</View>
									<Text />
									<View
										style={[styles.balloon, { backgroundColor: "#FFFFFF" }]}
									>
										<Text style={styles.baseText}>Entertainment</Text>
										<MultiSelect
											items={entItemsList}
											uniqueKey="id"
											onSelectedItemsChange={this.onEntItemsChange}
											selectedItems={entItems}
											selectText="Pick Items"
											searchInputPlaceholderText="Search Items..."
											onChangeInput={(text) => console.warn(text)}
											tagRemoveIconColor="#CCC"
											tagBorderColor="black"
											tagTextColor="black"
											selectedItemTextColor="#CCC"
											selectedItemIconColor="#CCC"
											itemTextColor="#000"
											displayKey="name"
											searchInputStyle={{ color: "#000" }}
											submitButtonColor="#CCC"
											submitButtonText="Submit"
											removeSelected
										/>
									</View>

									<Text />
									<View
										style={[styles.balloon, { backgroundColor: "#FFFFFF" }]}
									>
										<Text style={styles.baseText}>Range (Radius)</Text>
										<Slider
											maximumValue={100}
											minimumValue={5}
											step={5}
											value={this.state.value}
											onValueChange={(value) => this.setState({ value })}
										/>
										<Text>Value: {this.state.value}</Text>
									</View>
									<Text />
									<View
										style={[styles.balloon, { backgroundColor: "#FFFFFF" }]}
									>
										<Text style={styles.baseText}>Price</Text>
										<Slider
											maximumValue={100}
											minimumValue={0}
											step={5}
											value={this.state.priceValue}
											onValueChange={(priceValue) =>
												this.setState({ priceValue })
											}
										/>
										<Text>Value: {this.state.priceValue}</Text>
									</View>
									<TouchableOpacity onPress={() => {}}>
										<GradientTextButton text="Next" styles={styles} />
									</TouchableOpacity>
								</View>
							</View>
						</FadeInView>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#102C54",
	},
	innerContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 375,
	},
	scrollView: {
		marginHorizontal: 10,
		width: 375,
	},
	multiSelectContainer: {
		width: "80%",
	},
	item: {
		marginVertical: 14,
		flexDirection: "row",
	},
	itemIn: {
		marginLeft: 10,
	},
	itemOut: {
		alignSelf: "flex-end",
		marginRight: 10,
	},
	balloon: {
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 20,
	},
	arrowContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		// backgroundColor: 'red'
	},
	arrowLeftContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
		// backgroundColor: 'green'
	},

	arrowLeft: {
		left: -20,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: { width: 1, height: 5 },
		marginBottom: 20,
	},
	baseText: {
		fontWeight: "bold",
		fontSize: 25,
	},
	logo: {
		height: 50,
		marginBottom: null,
		resizeMode: "contain",
	},
});

export default Question;
