import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence
} from "firebase/auth";
import { auth } from "./config";

export async function signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  try {
    // This helps ensure the user's session is persisted correctly across browser tabs.
    if (typeof window !== 'undefined') {
      await setPersistence(auth, browserLocalPersistence);
    }
  } catch (error) {
    console.warn("Firebase persistence error:", error);
    // If browser persistence fails, fall back to in-memory persistence.
    if (typeof window !== 'undefined') {
        await setPersistence(auth, inMemoryPersistence);
    }
  }
  return signInWithPopup(auth, provider);
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}
