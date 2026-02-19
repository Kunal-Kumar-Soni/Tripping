"use client";
import Sidebar from "@/components/trips/sidebar";
import GlobalLoader from "@/components/loader/global-loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [router, user, isLoading]);

  return (
    <>
      {/* Global loader in protect routes */}
      <GlobalLoader isLoading={isLoading} />

      {/* Content */}
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-100">{children}</main>
      </div>
    </>
  );
}
