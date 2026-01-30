"use client";
import Sidebar from "@/components/home/sidebar";
import TripView from "@/components/home/trip-view";
import { useState } from "react";

export type TripsType = {
  id: number;
  title: string;
  time: string;
  person: number;
  duration: number;
  costEstimate: string;
};

export const TRIPS: TripsType[] = [
  {
    id: 1,
    title: "Wild West",
    time: "24 Jan '25 - 11 Feb '25",
    person: 5,
    duration: 18,
    costEstimate: "7,600",
  },
  {
    id: 2,
    title: "Backpacking Vietnam",
    time: "03 Apr '25 - 05 May '25",
    person: 3,
    duration: 32,
    costEstimate: "12,300",
  },
  {
    id: 3,
    title: "Family Retreat",
    time: "11 Nov '25 - 18 Nov '25",
    person: 4,
    duration: 7,
    costEstimate: "4,500",
  },
];

export default function Home() {
  const [activeTripsId, setActiveTripsId] = useState<number>(1);
  const activeTripInfo = TRIPS.find((trip) => trip.id === activeTripsId);

  return (
    <div>
      <Sidebar activeTripsId={activeTripsId} setActiveTripsId={setActiveTripsId} />
      <TripView activeTripInfo={activeTripInfo} />
    </div>
  );
}
