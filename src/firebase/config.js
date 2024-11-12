// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import app from 'firebase/app';
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxbY1NyhtHdG7eDK89j5FCifwlQp1NffI",
  authDomain: "proyectofinal-4b1ee.firebaseapp.com",
  projectId: "proyectofinal-4b1ee",
  storageBucket: "proyectofinal-4b1ee.firebasestorage.app",
  messagingSenderId: "1006111055041",
  appId: "1:1006111055041:web:2df8851e4e17b3e6170840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();