import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDoi2axfgCvd2EFaAY_PM1CuuA3K-4p3B8",
	authDomain: "next-memo-app-47f23.firebaseapp.com",
	projectId: "next-memo-app-47f23",
	storageBucket: "next-memo-app-47f23.appspot.com",
	messagingSenderId: "493422285804",
	appId: "1:493422285804:web:b49eca2fd57366d9f7e6c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db: Firestore = getFirestore(app);
