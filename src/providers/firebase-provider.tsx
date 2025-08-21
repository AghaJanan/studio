"use client";

import { createContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseConfig } from "@/lib/firebase/config";
import { getApp, getApps, initializeApp } from "firebase/app";

type FirebaseContextType = {
  user: User | null;
  loading: boolean;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
});

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}
