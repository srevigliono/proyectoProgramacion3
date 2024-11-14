
import { initializeApp } from "firebase/app";
import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBxbY1NyhtHdG7eDK89j5FCifwlQp1NffI",
  authDomain: "proyectofinal-4b1ee.firebaseapp.com",
  projectId: "proyectofinal-4b1ee",
  storageBucket: "proyectofinal-4b1ee.firebasestorage.app",
  messagingSenderId: "1006111055041",
  appId: "1:1006111055041:web:2df8851e4e17b3e6170840"
};

const app = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();