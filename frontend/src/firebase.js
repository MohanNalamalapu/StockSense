// Firebase initialization for StockSense
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase config
// You can use environment variables or import from a config file for security
const firebaseConfig = {
  apiKey: "AIzaSyCmcywSYwTD8gb-cBjWzWFJ9w-Je1NlogA",
  authDomain: "stocksense-42926.firebaseapp.com",
  projectId: "stocksense-42926",
  storageBucket: "stocksense-42926.firebasestorage.app",
  messagingSenderId: "396726124411",
  appId: "1:396726124411:web:9bd674d7ac59f8d72f47de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);
export { storage };
