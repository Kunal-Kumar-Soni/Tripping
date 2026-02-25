import PublicGuard from "@/components/auth/public-guard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicGuard>{children}</PublicGuard>;
}
