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
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/error";

type AppUser = {
  email: string;
  uid: string;
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setError(null);
      setIsLoading(true);
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get("/api/user");
        setUser(data);
      } catch (error: any) {
        const message = getErrorMessage(error);
        setError(message);
        toast.error(message);
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
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    }
  };

  const handleSigninWithEmailAndPassword = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    }
  };

  const handleWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await signOut(auth);
      toast.success("Logout successfully");
    } catch (error: any) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
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
