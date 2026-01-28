"use client";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  //   error: Error | null;
  handleSignupWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleSigninWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  handleWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const Provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
    // error,
    handleSignupWithEmailAndPassword,
    handleSigninWithEmailAndPassword,
    handleWithGoogle,
    handleLogout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
