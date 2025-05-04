// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzUfPb9sKm1yRxeZZoGzXzjFHBVsWfSZ0",
  authDomain: "hsk-learn.firebaseapp.com",
  projectId: "hsk-learn",
  storageBucket: "hsk-learn.firebasestorage.app",
  messagingSenderId: "95138608534",
  appId: "1:95138608534:web:4ffb82bf37fc16493b19b7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
