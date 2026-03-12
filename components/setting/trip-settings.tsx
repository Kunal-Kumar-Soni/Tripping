"use client";
import TripSettingsHeader from "./trip-settings-header";
import MembersCard from "./members-card";
import PreferencesCard from "./preferences-card";
import DurationCard from "./duration-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrip } from "@/hooks/useTrip";
import BlueLoader from "../loader/blue-loader";

const TripSettings = () => {
  const router = useRouter();
  const { trips, selectedTrip, loadingTrips } = useTrip();

  useEffect(() => {
    if (!loadingTrips && (!trips || !selectedTrip)) {
      router.replace("/");
    }
  }, [trips, selectedTrip, loadingTrips, router]);

  if (loadingTrips) return <BlueLoader />;
  if (!selectedTrip) return null;

  return (
    <section className="space-y-8">
      <TripSettingsHeader />

      {/* Content Overview */}
      <DurationCard />
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <PreferencesCard />
        <MembersCard />
      </div>
    </section>
  );
};

export default TripSettings;
