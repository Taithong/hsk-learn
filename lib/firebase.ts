import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzUfPb9sKm1yRxeZZoGzXzjFHBVsWfSZ0",
  authDomain: "hsk-learn.firebaseapp.com",
  projectId: "hsk-learn",
  storageBucket: "hsk-learn.appspot.com",
  messagingSenderId: "95138608534",
  appId: "1:95138608534:web:4ffb82bf37fc16493b19b7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
