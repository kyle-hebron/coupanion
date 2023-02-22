// Import the functions you need from the SDKs you need
//import firebase from 'firebase'
//import {initializeApp} from 'firebase/app'
//import {getAuth} from 'firebase/auth'
//import { getFirestore } from 'firebase/firestore'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeK7CmmOK3a0aeiiWuig6r5ElAu3jjH4E",
  authDomain: "coupanion-96203.firebaseapp.com",
  projectId: "coupanion-96203",
  storageBucket: "coupanion-96203.appspot.com",
  messagingSenderId: "554554593799",
  appId: "1:554554593799:web:87cb7e8468f7017c3650a2",
  measurementId: "G-00329WN9XK"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };


