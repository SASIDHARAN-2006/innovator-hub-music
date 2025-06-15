// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7p9Cvl_sWJDtGA5-uOYCBirPSJENtxB0",
  authDomain: "innovators-hub-music-5a15c.firebaseapp.com",
  projectId: "innovators-hub-music-5a15c",
  storageBucket: "innovators-hub-music-5a15c.firebasestorage.app",
  messagingSenderId: "230905261415",
  appId: "1:230905261415:web:d484fd82d9b5864179d3c2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __Auth = getAuth(firebaseApp)
export const __DB = getFirestore(firebaseApp)