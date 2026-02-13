import Sidebar from "@/components/home/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-100">{children}</main>
    </div>
  );
}
