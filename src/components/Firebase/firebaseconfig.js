// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrAmi0P0vIP1a_Irv4y003VqEh_-Fesqs",
  authDomain: "falldetectionapp-6220b.firebaseapp.com",
  projectId: "falldetectionapp-6220b",
  storageBucket: "falldetectionapp-6220b.appspot.com",
  messagingSenderId: "762052030913",
  appId: "1:762052030913:web:f1d96dc3318712d3a67f40",
  measurementId: "G-5K3L7X3BKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

//Initalize Firestore
export const db=getFirestore(app)