import Sidebar from "@/components/trips/sidebar";
import AuthGuard from "@/components/auth/auth-guard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      {/* Content */}
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-100">{children}</main>
      </div>
    </AuthGuard>
  );
}
