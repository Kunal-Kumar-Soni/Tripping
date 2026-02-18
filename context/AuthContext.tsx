"use client";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

type AppUser = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

type AuthContextType = {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  handleSignupWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleSigninWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBackendUser = async (): Promise<AppUser> => {
    const { data } = await axiosInstance.get("/api/user");
    return data;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setError(null);
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const backendUser = await fetchBackendUser();
        setUser(backendUser);
      } catch (error: any) {
        setError(error.message);
        if (error.response?.status === 401) {
          await signOut(auth);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignupWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSigninWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    handleSignupWithEmailAndPassword,
    handleSigninWithEmailAndPassword,
    handleWithGoogle,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
