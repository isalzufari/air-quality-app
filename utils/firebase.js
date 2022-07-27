// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAswtbvOlnA-VYEVYe9CdFzYNmvLIJM4Nc",
  authDomain: "calas-app-c8c8e.firebaseapp.com",
  projectId: "calas-app-c8c8e",
  storageBucket: "calas-app-c8c8e.appspot.com",
  messagingSenderId: "257982862184",
  appId: "1:257982862184:web:b8eec8b6a45a11a98c3cdd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {
  app,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
};
