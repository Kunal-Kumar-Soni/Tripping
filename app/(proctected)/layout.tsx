import ProtectedGuard from "@/components/auth/protected-guard";
import Sidebar from "@/components/trip/sidebar";
import { ActivityProvider } from "@/context/ActivityContext";
import { PlanProvider } from "@/context/PlanContext";
import { TripProvider } from "@/context/TripContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedGuard>
      <TripProvider>
        <ActivityProvider>
          <PlanProvider>
            {/* Content */}
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="ml-100 flex-1">{children}</main>
            </div>
          </PlanProvider>
        </ActivityProvider>
      </TripProvider>
    </ProtectedGuard>
  );
}
