// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_dVnP3GnJN-ghkLsnB_ts1XKnQtVxBsg",
  authDomain: "bajamas-1076.firebaseapp.com",
  projectId: "bajamas-1076",
  storageBucket: "bajamas-1076.appspot.com",
  messagingSenderId: "155716809863",
  appId: "1:155716809863:web:f80ad2497e2bd9dbb03422",
  measurementId: "G-NC3E2TP3MX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
