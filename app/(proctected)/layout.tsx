import ProtectedGuard from "@/components/auth/protected-guard";
import Sidebar from "@/components/trip/sidebar";
import { ActivityProvider } from "@/context/ActivityContext";
import { PlanProvider } from "@/context/PlanContext";
import { TransportProvider } from "@/context/TransportContext";
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
            <TransportProvider>
              {/* Content */}
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="ml-100 flex-1">{children}</main>
              </div>
            </TransportProvider>
          </PlanProvider>
        </ActivityProvider>
      </TripProvider>
    </ProtectedGuard>
  );
}
