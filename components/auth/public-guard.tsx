"use client";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";
import GlobalLoader from "../loader/global-loader";
import { useRouter } from "next/navigation";

const PublicGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <GlobalLoader />;

  if (user) return null;
  return <>{children}</>;
};

export default PublicGuard;
