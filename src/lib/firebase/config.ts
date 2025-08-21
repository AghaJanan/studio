import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  // IMPORTANT: Replace with your Firebase project's configuration
  apiKey: "AIzaSyDz8SwicxbG06oAivJkdipAbmnC7bREChA",
  authDomain: "hosteldesk-93tgb.firebaseapp.com",
  projectId: "hosteldesk-93tgb",
  storageBucket: "hosteldesk-93tgb.firebasestorage.app",
  messagingSenderId: "21622555201",
  appId: "1:21622555201:web:db6116096ddfa914b1fcc0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
