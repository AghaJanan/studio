"use client";

import { createContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

type FirebaseContextType = {
  user: User | null;
  loading: boolean;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
});

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
