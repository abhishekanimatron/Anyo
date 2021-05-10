import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";//was used to import data to firestore

//config from firebase setup
const config = {
  apiKey: "AIzaSyBn4SUJemUahLZs_syMeh2md3UsFGLiju4",
  authDomain: "anyo-f0f1a.firebaseapp.com",
  projectId: "anyo-f0f1a",
  storageBucket: "anyo-f0f1a.appspot.com",
  messagingSenderId: "516027626352",
  appId: "1:516027626352:web:e45155e91cb595fdd055b5",
};

//initialize and assign values
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log("firebase", firebase);
// seedDatabase(firebase);//was used to import data to firestore

export { firebase, FieldValue };
