import { collection, addDoc, query, where, onSnapshot, serverTimestamp, type DocumentData } from "firebase/firestore";
import { db } from "./config";
import type { Hostel } from "@/components/hostel-card";

const hostelsCollection = collection(db, "hostels");

export async function addHostel(hostelData: Omit<Hostel, 'id' | 'createdAt'>) {
  try {
    await addDoc(hostelsCollection, {
      ...hostelData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding hostel: ", error);
    throw new Error("Could not add hostel");
  }
}

export function getHostelsForUser(userId: string, callback: (hostels: Hostel[]) => void) {
  const q = query(hostelsCollection, where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const hostels: Hostel[] = [];
    querySnapshot.forEach((doc) => {
      hostels.push({ id: doc.id, ...doc.data() } as Hostel);
    });
    callback(hostels);
  });

  return unsubscribe;
}
