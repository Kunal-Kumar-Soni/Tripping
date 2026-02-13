"use client";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
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
  handleSignupWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleSigninWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const Provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          const backendUser = await fetchBackendUser();
          setUser(backendUser);
        } catch (error: any) {
          console.error("Backend Sync Error:", error);
          setUser(null);
          if (error.response?.status === 401) {
            await signOut(auth);
          }
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchBackendUser = async (): Promise<AppUser> => {
    const { data } = await axiosInstance.get("/api/user");
    return data;
  };

  const handleSignupWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
    }
    setIsLoading(false);
  };

  const handleSigninWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Sign In Error:", error.message);
    }
    setIsLoading(false);
  };

  const handleWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, Provider);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    handleSignupWithEmailAndPassword,
    handleSigninWithEmailAndPassword,
    handleWithGoogle,
    handleLogout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
