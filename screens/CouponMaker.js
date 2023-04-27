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
	Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { db } from '../firebase'
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CouponMaker = ({ navigation }) => {

	const auth = getAuth();
	const user = auth.currentUser;

	const [titleText, setTitleText] = useState('');
	const [codeText, setCodeText] = useState('');
	const [discountText, setDiscountText] = useState('');
	const [descriptionText, setDescription] = useState('');
	const [expDate, setExpDate] = useState('Expiration');

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		console.warn("A date has been picked: ", removeTime(date));
		setExpDate(removeTime(date));
		hideDatePicker();
	};

	function removeTime(date) {
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
	  }


	const errorAlert = () =>
    Alert.alert('Error', 'A coupon with this code already exists.', [
      {
        text: 'Ok',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
	
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<Text style={styles.title}>Create a coupon</Text>
					<View style={styles.qrSection}>
						<Ionicons name={"qr-code-outline"} size={150} color={"white"} />
						<View style={styles.qrSectionInput}>
							<TextInput placeholder="Title" style={styles.input} onChangeText={newText => setTitleText(newText)}/>
							<TextInput placeholder="Code" style={styles.input} onChangeText={newText => setCodeText(newText)}/>
						</View>
					</View>
					<View style={styles.bottom}>
						<TextInput
							keyboardType="numeric"
							placeholder="Discount"
							style={[styles.discount, styles.input]}
							maxLength={3}
							onChangeText={newText => setDiscountText(newText)}
						/>

						<TouchableOpacity style={styles.date} onPress={showDatePicker}>
							<Icon
								style={styles.calendar}
								name="calendar-week"
								size={25}
								color="lightgray"
							/>
							<Text styles={styles.dateText}>{expDate}</Text>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							//maximumDate={new Date(20301229)}
							//minimumDate={new Date(19500101)}
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							display="inline"
						/>
						
					</View>
					<View style={styles.bottom}>
					<TextInput
							placeholder="Description"
							style={[styles.discount, styles.inputs]}
							
							onChangeText={newText => setDescription(newText)}
						/>
					</View>

					<TouchableOpacity onPress={async () => {
						var currentCoupons;
						var coupons = {Coupons: {}};
						var error = false;

						try {
							const docSnap = await getDoc(doc(db, "Business people", user.uid));
							console.log(docSnap.data());
							currentCoupons = Object.keys(docSnap.data()['Coupons']);
							console.log(currentCoupons);
						} catch(error) {
							console.log(error)
						}

						coupons['Coupons'][codeText] = {
							title: titleText,
							description: descriptionText,
							discount: discountText,
							expiration: expDate,
							couponCode: codeText,
						};

						for (var i = 0; i < currentCoupons.length; i++) {
							if (currentCoupons[i] == codeText) {
								error = true;
								errorAlert();
								console.log('Error');
							}
						}
						if (!error) {
							if (user) {
								setDoc(doc(db, "Business people", user.uid), coupons, { merge: true });

								console.log('Coupon Created');


							} else {
								console.log("No Coupon Created");
								setError("No Coupon Created");
							}
						}
					}} style={styles.button}>
						<Text styles={styles.buttonText}>Create</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default CouponMaker;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#102C54",
		flex: 1,
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 75,
		paddingVertical: 15,
		borderRadius: 100,
		textAlign: "center",
	},
	qrSection: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		marginTop: 5,
	},
	qrSectionInput: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		//backgroundColor: "white",
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 36,
		marginLeft: 15,
		marginTop: 30,
		borderRadius: 100,
	},
	bottom: {
		alignItems: "center",
		justifyContent: "center",
		//marginLeft: 15,
		flexDirection: "row",
	},
	button: {
		borderRadius: 100,
		alignItems: "center",
		paddingVertical: 20,
		backgroundColor: "lightblue",
		marginTop: 20,
		padding: 25,
		marginHorizontal: 10,
	},
	inputs: {
		backgroundColor: "white",
		paddingHorizontal: 145,
		paddingVertical: 15,
		borderRadius: 100,
		marginTop: 20,
		textAlign: "center",
	},

	calendar: { marginRight: 15 },

	date: {
		borderRadius: 100,
		textAlign: "center",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		padding: 10,
		paddingHorizontal: 25,
		marginLeft: 10,
	},
	discount: {},
});
