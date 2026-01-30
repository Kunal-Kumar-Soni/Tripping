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
  {
    id: 4,
    title: "Mountain Escape",
    time: "15 Jun '25 - 22 Jun '25",
    person: 2,
    duration: 8,
    costEstimate: "3,200",
  },
  {
    id: 5,
    title: "Tokyo Tech Tour",
    time: "10 Sep '25 - 25 Sep '25",
    person: 1,
    duration: 16,
    costEstimate: "15,800",
  },
  {
    id: 6,
    title: "Goa Beach Bash",
    time: "28 Dec '25 - 05 Jan '26",
    person: 8,
    duration: 9,
    costEstimate: "6,400",
  },
  {
    id: 7,
    title: "European Summer",
    time: "12 Jul '25 - 15 Aug '25",
    person: 3,
    duration: 35,
    costEstimate: "22,100",
  },
  {
    id: 8,
    title: "Desert Safari Dubai",
    time: "05 Oct '25 - 12 Oct '25",
    person: 4,
    duration: 8,
    costEstimate: "9,900",
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
