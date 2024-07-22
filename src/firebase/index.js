//* Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//! Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9R4_o50-Ii0_FlpROroZc6JNE2ZVWmQ0",
  authDomain: "twitter-x-c3f93.firebaseapp.com",
  projectId: "twitter-x-c3f93",
  storageBucket: "twitter-x-c3f93.appspot.com",
  messagingSenderId: "744797170009",
  appId: "1:744797170009:web:307e5aa220b38ef7db0448",
};

//? Initialize Firebase
const app = initializeApp(firebaseConfig);

//*Kimlik doğrulama
export const auth = getAuth(app);

//*Google Provider

export const provider = new GoogleAuthProvider();

//* Cloud FireStore DB

export const db = getFirestore(app);

//! Cloud Storage

export const storage = getStorage(app);
