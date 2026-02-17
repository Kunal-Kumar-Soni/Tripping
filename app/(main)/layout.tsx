"use client";
import Sidebar from "@/components/home/sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useAuth();

  return (
    <div className="relative min-h-screen">
      {/* Overlay */}
      {isLoading && <div className="z-50 absolute inset-0 bg-background/50 backdrop-blur-md" />}
      {/* Content */}
      <div
        className={`flex w-full transition-all duration-300 ${
          isLoading ? "pointer-events-none select-none" : ""
        }`}
      />

      <Sidebar />

      <main className="ml-100">{children}</main>
    </div>
  );
}
