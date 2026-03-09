import Sidebar from "@/components/trip/sidebar/sidebar";
import ProtectedGuard from "@/components/auth/protected-guard";
import { TripProvider } from "@/context/TripContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { PlanProvider } from "@/context/PlanContext";

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
              <main className="flex-1 ml-100">{children}</main>
            </div>
          </PlanProvider>
        </ActivityProvider>
      </TripProvider>
    </ProtectedGuard>
  );
}
