import {
	getDoc,
	doc,
	query,
	collection,
	getDocs,
	where,
} from "firebase/firestore"

import { db } from "../firebase"

//Search the database to see if there is a user with these credentials
async function isBusiness(uid) {
	if (uid) {
		const qB = query(
			collection(db, "Business people"),
			where("uid", "==", uid)
		)
		const qU = query(collection(db, "Users"), where("uid", "==", uid))
		const querySnapshotBusiness = await getDocs(qB)
		const querySnapshotUser = await getDocs(qU)

		var business = false

		querySnapshotBusiness.forEach((doc) => {
			if (doc) {
				console.log("There is a business with this UID")
				business = true
			}
		})

		querySnapshotUser.forEach((doc) => {
			if (doc) {
				console.log("There is a user with this UID")
				business = false
			}
		})
		return business
	}
}

export { isBusiness }
