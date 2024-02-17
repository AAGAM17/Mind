// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlbY6j-9PCtpScpVP15Fk3N28Xp2ggB7Q",
  authDomain: "mind-9ac7f.firebaseapp.com",
  projectId: "mind-9ac7f",
  storageBucket: "mind-9ac7f.appspot.com",
  messagingSenderId: "94142579387",
  appId: "1:94142579387:web:aee555decb66f81eeadf9e",
  measurementId: "G-95GZQ8EHBP"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);