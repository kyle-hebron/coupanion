import {
	getDoc,
	doc,
	query,
	collection,
	getDocs,
	where,
} from "firebase/firestore"

import { useState } from "react"
import { db, auth } from "../firebase"

//Search the database to see if there is a user with these credentials
async function isBusiness() {
	const [isABusiness, setIsABusiness] = useState(false)
	if (auth.currentUser) {
		console.log("Checking if user is a business" + auth.currentUser.uid)
		//Get all businesses with uid
		getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
			if (docSnap.exists()) {
				console.log("User found!")
				setIsABusiness(false)
			} else {
				console.log("No user found!")
			}
		})

		getDoc(doc(db, "Business people", auth.currentUser.uid)).then(
			(docSnap) => {
				if (docSnap.exists()) {
					console.log("Business found!")
					setIsABusiness(true)
				} else {
					console.log("No business found!")
				}
			}
		)
	}
	console.log(isABusiness)
	return isABusiness
}

export { isBusiness }
