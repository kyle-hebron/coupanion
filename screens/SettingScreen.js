import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedbackBase,
	Switch,
} from "react-native"
import React, { useState, useRef } from "react"
import { ThemedButton } from "react-native-really-awesome-button"
import { TextInput } from "react-native-element-textinput"
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"

const SettingScreen = ({ navigation }) => {
	const [isEnabled, setIsEnabled] = React.useState(false)
	const [userName, setUserName] = useState("")
	const [email, setEmail] = useState("")

	const [expoPushToken, setExpoPushToken] = useState("")
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	const setupNotifictions = () => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		)

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification)
			})

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response)
				}
			)

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			)
			Notifications.removeNotificationSubscription(
				responseListener.current
			)
		}
	}

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail! 📬",
				body: "Here is the notification body",
				data: { data: "goes here" },
			},
			trigger: { seconds: 2 },
		})
	}

	async function registerForPushNotificationsAsync() {
		let token

		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== "granted") {
				Alert.alert(
					"Failed to enable push notifications!",
					"Open the settings app to enable them",
					[
						{
							text: "Back",
						},
						{
							text: "Settings",
							onPress: () =>
								Linking.openSettings().catch(() =>
									Alert.alert(
										"Error",
										"Unable to open settings"
									)
								),
						},
					]
				)
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
			console.log(token)
		} else {
			alert("Must use physical device for Push Notifications")
		}

		return token
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.goBack()
				}}
			>
				<Icon
					name="arrow-left"
					size={30}
					color="white"
					style={{
						marginLeft: 20,
						marginTop: 10,
					}}
				/>
			</TouchableOpacity>

			<Text
				style={{
					fontWeight: "bold",
					textAlign: "center",
					color: "white",
					lineHeight: 60,
					fontSize: 30,
					paddingTop: 30,
					marginBottom: 45,
				}}
			>
				Settings
			</Text>

			<TextInput
				userName={userName}
				style={styles.input}
				inputStyle={styles.inputStyle}
				labelStyle={styles.labelStyle}
				placeholderStyle={styles.placeholderStyle}
				textErrorStyle={styles.textErrorStyle}
				label="Username"
				placeholder="New Username"
				placeholderTextColor="gray"
				focusColor="white"
				onChangeText={(text) => {
					setUserName(text)
				}}
			/>
			<TouchableOpacity
				onPress={() => {
					console.log("username has been updated")
				}}
			>
				<Icon
					name="check"
					backgroundColor="#102C54"
					size={30}
					color="white"
					style={{
						marginLeft: 335,
						marginTop: -65,
					}}
				/>
			</TouchableOpacity>

			<TextInput
				email={email}
				style={styles.input}
				inputStyle={styles.inputStyle}
				labelStyle={styles.labelStyle}
				placeholderStyle={styles.placeholderStyle}
				textErrorStyle={styles.textErrorStyle}
				label="Email"
				placeholder="New Email"
				placeholderTextColor="gray"
				focusColor="white"
				onChangeText={(text) => {
					setEmail(text)
				}}
			/>
			<TouchableOpacity
				onPress={() => {
					console.log("Email updated")
				}}
			>
				<Icon
					name="check"
					backgroundColor="#102C54"
					size={30}
					color="white"
					style={{
						marginLeft: 335,
						marginTop: -65,
					}}
				/>
			</TouchableOpacity>

			<Text
				style={{
					color: "white",
					paddingLeft: 20,
					paddingTop: 35,
					fontWeight: "700",
				}}
			>
				Enable Notifications
			</Text>

			<Switch
				value={isEnabled}
				onValueChange={(value) => setIsEnabled(value)}
				style={{ marginTop: -22, marginLeft: 325 }}
			/>
			<TouchableOpacity
				onPress={() => {
					console.log("Email Sent to Reset Password")
				}}
			>
				<Text
					style={{
						color: "white",
						fontWeight: "700",
						paddingLeft: 20,
						paddingTop: 60,
					}}
				>
					Forgot Password?
				</Text>
			</TouchableOpacity>

			{/*  
       Need clickable text where depending on the user
       (if theyre a business or a customer)
       it'll either display that you can change your address info
       or update your tags
     */}
			<TouchableOpacity
				onPress={() => {
					console.log("Email Sent to Reset Password")
				}}
			>
				<Text
					style={{
						color: "white",
						fontWeight: "700",
						paddingLeft: 20,
						paddingTop: 60,
					}}
				>
					Update Tags/Business Address
				</Text>
			</TouchableOpacity>
			<ThemedButton
				name="rick"
				type="secondary"
				style={{ marginTop: 135, marginLeft: 95 }}
				onPress={() => {
					auth.signOut()
					// Log out here but also need to make sure that the user is logged out of the app
					// For some reason I cannot go back to this screen even though I could before
					navigation.navigate("Login")
				}}
			>
				Log Out
			</ThemedButton>
		</SafeAreaView>
	)
}

export default SettingScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},
	input: {
		height: 55,
		paddingHorizontal: 12,
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: "white",
		backgroundColor: "white",
		marginTop: 10,
		marginBottom: 20,
		width: 297,
		marginLeft: 15,
	},
	//inputStyle: {fontSize: 16},
	labelStyle: {
		fontSize: 14,
		position: "absolute",
		top: -10,
		backgroundColor: "#102C54",
		paddingHorizontal: 4,
		marginLeft: -4,
	},
	placeholderStyle: { fontSize: 16 },
	textErrorStyle: { fontSize: 16 },

	/*button: {
   borderRadius: 100,
   paddingHorizontal: 105,
   paddingVertical: 15,
   width: 270,
   backgroundColor: 'lightblue',
   left: 60,
   top: 530,


 },*/
})
