import AsyncStorage from "@react-native-async-storage/async-storage"

export const setBusiness = async (value) => {
	try {
		console.log("Business set to: " + value)
		await AsyncStorage.setItem("@isBusiness", value)
	} catch (e) {
		// saving error
		console.log(e)
	}
}

export const getBusiness = async () => {
	try {
		const value = await AsyncStorage.getItem("@isBusiness")
		if (value !== null) {
			return value
		}
	} catch (e) {
		// error reading value
		console.log("No value found")
	}
}
