import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4NNaOUR66ioEro-LHBrWmAhKOi6ml-n8",
  authDomain: "rhode-beauty.firebaseapp.com",
  projectId: "rhode-beauty",
  storageBucket: "rhode-beauty.firebasestorage.app",
  messagingSenderId: "875219135657",
  appId: "1:875219135657:web:a19b91e2a1b16fefe64db8",
  measurementId: "G-Y3Y0TREWR0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
