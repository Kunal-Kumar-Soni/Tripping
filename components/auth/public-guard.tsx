"use client";
import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import GlobalLoader from "../loader/global-loader";

const PublicGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <GlobalLoader />;

  if (!user) {
    return <>{children}</>;
  }
  return null;
};

export default PublicGuard;
