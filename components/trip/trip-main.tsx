"use client";
import { useActivity } from "@/hooks/useActivity";
import { usePlan } from "@/hooks/usePlan";
import { useTrip } from "@/hooks/useTrip";

import BlueLoader from "../loader/blue-loader";
import TripFallback from "../loader/trip-fallback";
import TripHeader from "./trip_view/trip-header";
import TripView from "./trip_view/trip-view";

const TripMain = () => {
  const { trips, loadingTrips } = useTrip();
  const { loadingActivities } = useActivity();
  const { loadingPlans } = usePlan();

  const isLoading = loadingTrips || loadingActivities || loadingPlans;

  if (isLoading) return <BlueLoader />;

  if (trips.length === 0) return <TripFallback />;

  return (
    <div>
      <TripHeader />
      <TripView />
    </div>
  );
};

export default TripMain;
