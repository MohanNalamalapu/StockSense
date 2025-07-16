// Firestore user data management utilities
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Save a prediction/session
export async function savePrediction(uid, predictionData) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { predictions: arrayUnion(predictionData) }, { merge: true });
}

// Add/remove favorite stock (watchlist)
export async function addFavoriteStock(uid, stockSymbol) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { favorites: arrayUnion(stockSymbol) }, { merge: true });
}

// Save user settings/preferences
export async function saveUserSettings(uid, settings) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { settings }, { merge: true });
}

// Save exported file metadata
export async function addExportedFile(uid, fileMeta) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { exportedFiles: arrayUnion(fileMeta) }, { merge: true });
}

// Save/update profile data
export async function saveProfileData(uid, profile) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { profile }, { merge: true });
}

// Add notification/alert
export async function addNotification(uid, notification) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { notifications: arrayUnion(notification) }, { merge: true });
}

// Get all user data
export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : {};
}
