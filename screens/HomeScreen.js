import React, { useState, useEffect } from "react"
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	SafeAreaView,
	SafeAreaProvider,
	TouchableOpacity,
} from "react-native"
import { db, auth } from "../firebase"
import { isBusiness } from "../Helpers/dbHelper"

function HomeScreen({ navigation }) {
	const [trendingBusinesses, setTrendingBusinesses] = useState([])
	const [topRatedBusinesses, setTopRatedBusinesses] = useState([])

	useEffect(() => {
		// Get trending businesses from Firestore .
		const trendingBusinessesRef = db
			.collection("Business people")
			.where("trending", "==", true)
		const unsubscribeTrending = trendingBusinessesRef.onSnapshot(
			(snapshot) => {
				const businesses = []
				snapshot.forEach((doc) => {
					const data = doc.data()
					businesses.push({
						id: doc.id,
						name: data.business,
						tag: data.tag,
						image: { uri: data.image },
					})
				})
				setTrendingBusinesses(businesses)
			}
		)

		// Get top rated businesses from Firestore .
		const topRatedBusinessesRef = db
			.collection("Business people")
			.where("top rated", "==", true)
		const unsubscribeTopRated = topRatedBusinessesRef.onSnapshot(
			(snapshot) => {
				const businesses = []
				snapshot.forEach((doc) => {
					const data = doc.data()
					businesses.push({
						id: doc.id,
						name: data.business,
						tag: data.tag,
						image: { uri: data.image },
					})
				})
				setTopRatedBusinesses(businesses)
			}
		)

		return () => {
			unsubscribeTrending()
			unsubscribeTopRated()
		}
	}, [])

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("Business", { id: item.id })}
		>
			<View style={styles.item}>
				<Image
					source={item.image}
					style={styles.logo}
				/>
				<View style={styles.nameContainer}>
					<Text style={styles.text}>{item.name}</Text>
					<Text style={styles.tag}>{item.tag}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>Explore</Text>
			</View>
			<View style={styles.trendingContainer}>
				<Text style={styles.trendingText}>Trending</Text>
				<FlatList
					data={trendingBusinesses}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
			<View style={styles.topRatedContainer}>
				<Text style={styles.topRatedText}>Top Rated</Text>
				<FlatList
					data={topRatedBusinesses}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 10,
		paddingTop: 30,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 15,
	},
	headerText: {
		fontSize: 33,
		fontWeight: "bold",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
		marginHorizontal: 16,
		paddingVertical: 8,
		paddingHorizontal: 33,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
	},
	logo: {
		width: 64,
		height: 64,
		borderRadius: 32,
		marginRight: 33,
	},
	textContainer: {
		flex: 1,
	},
	text: {
		fontSize: 19,
		fontWeight: "bold",
		marginBottom: 4,
	},
	tag: {
		fontSize: 13,
		color: "#666",
		fontWeight: "bold",
	},
	trendingContainer: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 16,
		paddingBottom: 16,
	},
	trendingText: {
		fontSize: 25,
		fontWeight: "bold",
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	topRatedContainer: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 16,
		paddingBottom: 16,
	},
	topRatedText: {
		fontSize: 25,
		fontWeight: "bold",
		paddingHorizontal: 16,
		marginBottom: 16,
	},
})

export default HomeScreen
