import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import Script from "next/script";

import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tripping App",
  description:
    "Plan your trips effortlessly with drag-and-drop timeline, activity management, and route visualization.",
  keywords: ["trip planner", "travel app", "itinerary planner", "nextjs app"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        <Script
          src="https://t.contentsquare.net/uxa/8e85352ab85d9.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
