import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBMbxycEiphOwg_WXAcwRqf8B6SZAQZsJ0",
  authDomain: "react-app-74453.firebaseapp.com",
  projectId: "react-app-74453",
  storageBucket: "react-app-74453.firebasestorage.app",
  messagingSenderId: "5687767642",
  appId: "1:5687767642:web:0607b738e02e15f30c1e63"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);