// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7gRjIa3CZuDOGpZKFrXJLCyVa4SOxRnc",
  authDomain: "spendify-f7edb.firebaseapp.com",
  projectId: "spendify-f7edb",
  storageBucket: "spendify-f7edb.appspot.com",
  messagingSenderId: "836690618691",
  appId: "1:836690618691:web:c87084390185eecd1ae7f6",
  measurementId: "G-K0D4LEFPZW",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
