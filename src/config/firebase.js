// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm0WMQrdmlEE3hxbO8Fy-qX6votFAFscI",
  authDomain: "busy-buy-app-7f181.firebaseapp.com",
  projectId: "busy-buy-app-7f181",
  storageBucket: "busy-buy-app-7f181.firebasestorage.app",
  messagingSenderId: "906522894495",
  appId: "1:906522894495:web:c062d6563e0f2d026302aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// Initialize Firebase and configure the firebase.
