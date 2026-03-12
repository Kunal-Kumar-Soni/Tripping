"use client";
import { usePlan } from "@/hooks/usePlan";
import TripFallback from "../loader/trip-fallback";
import { Spinner2 } from "../ui/spinner";
import TripHeader from "./trip_view/trip-header";
import TripView from "./trip_view/trip-view";
import { useTrip } from "@/hooks/useTrip";
import { useActivity } from "@/hooks/useActivity";
import BlueLoader from "../loader/blue-loader";

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
