// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "************************************",
  authDomain: "************************************",
  projectId: "busy-buy-app-*****",
  storageBucket: "busy-buy-app-****.firebasestorage.app",
  messagingSenderId: "***********",
  appId: "*:00000000000:web:********************************",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// Initialize Firebase and configure the firebase.
