// Utility functions for managing user history in Firestore
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Save a viewed stock to user history
export async function addViewedStock(uid, stockSymbol) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { viewedStocks: arrayUnion(stockSymbol) }, { merge: true });
}

// Save an exported CSV record to user history
export async function addExportedCSV(uid, csvInfo) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { exportedCSVs: arrayUnion(csvInfo) }, { merge: true });
}

// Get user history (viewed stocks and exported CSVs)
export async function getUserHistory(uid) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return { viewedStocks: [], exportedCSVs: [] };
  }
}
