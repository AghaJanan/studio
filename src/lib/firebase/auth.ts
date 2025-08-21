import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  type UserCredential
} from "firebase/auth";
import { auth } from "./config";

export async function signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}
