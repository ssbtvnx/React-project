import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDpgGG0u46fpeIqFf0DgZDcflkowhIraQk",
  authDomain: "react-endterm-d954b.firebaseapp.com",
  projectId: "react-endterm-d954b",
  storageBucket: "react-endterm-d954b.firebasestorage.app",
  messagingSenderId: "731952187934",
  appId: "1:731952187934:web:8f68eb7a820c6ddcc5fc0f",
  measurementId: "G-4YM8CQ87QQ"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
