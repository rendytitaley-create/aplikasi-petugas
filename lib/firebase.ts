import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Salin konfigurasi dari Firebase Console di bawah ini
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "aplikasi-petugas.firebaseapp.com",
  projectId: "aplikasi-petugas",
  storageBucket: "aplikasi-petugas.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor layanan agar bisa dipakai di file lain
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);