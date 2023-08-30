// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIHNKypEA0aE1Tyrl9JnfZFaGbaqenmXo",
  authDomain: "chat-d559d.firebaseapp.com",
  databaseURL: "https://chat-d559d-default-rtdb.firebaseio.com",
  projectId: "chat-d559d",
  storageBucket: "chat-d559d.appspot.com",
  messagingSenderId: "698811680380",
  appId: "1:698811680380:web:5f40137c0578bcd7d2ebf9",
  measurementId: "G-75C4NPNGPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();