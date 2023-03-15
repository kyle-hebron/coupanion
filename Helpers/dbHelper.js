import {
	db,
	auth,
	getDoc,
	doc,
	query,
	collection,
	getDocs,
} from "firebase/firestore";

//Search the database to see if there is a user with these credentials
export const isBusiness = async (uid) => {
	console.log("here");
	const qB = query(collection(db, "Business people"), where("uid", "==", uid));
	const qU = query(collection(db, "Business people"), where("uid", "==", uid));
	const querySnapshotBusiness = await getDocs(qB);
	const querySnapshotUser = await getDocs(qU);

	querySnapshotBusiness.forEach((doc) => {
		if (doc) {
			console.log("There is a business with this UID");
			return true;
		}
	});

	querySnapshotUser.forEach((doc) => {
		if (doc) {
			console.log("There is a user with this UID");
			return false;
		}
	});

	console.log("No user found with this UID");
};
