// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "edushare-7bb58.firebaseapp.com",
  projectId: "edushare-7bb58",
  storageBucket: "edushare-7bb58.appspot.com",
  messagingSenderId: "672898370098",
  appId: "1:672898370098:web:389a8680ee0e664cf3ca2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
