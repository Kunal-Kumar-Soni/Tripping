"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

const TRIPS = [
  {
    id: "1",
    tripName: "Wild West",
    startDate: "2025-01-24",
    endDate: "2025-02-11",
    person: "5",
    estimatedPrice: "7,600",
    duration: 18,
  },
  {
    id: "2",
    tripName: "Backpacking Vietnam",
    startDate: "2025-04-03",
    endDate: "2025-05-25",
    person: "3",
    estimatedPrice: "12,300",
    duration: 32,
  },
  {
    id: "3",
    tripName: "Family Retreat",
    startDate: "2025-11-11",
    endDate: "2025-11-18",
    person: "4",
    duration: 7,
    estimatedPrice: "4,500",
  },
];

export type TripInfoType = {
  id: string;
  tripName: string;
  startDate: string;
  endDate: string;
  person: string;
  estimatedPrice: string;
  duration: number;
};
type TripContextType = {
  // tripInfo: TripInfoType | null;
  // setTripInfo: React.Dispatch<TripInfoType | null>;
  trips: TripInfoType[] | null;
  setTrips: Dispatch<SetStateAction<TripInfoType[] | null>>;
  activeTripInfo: TripInfoType | null;
  setActiveTripInfo: Dispatch<SetStateAction<TripInfoType | null>>;
};

export const TripContext = createContext<TripContextType | null>(null);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  // const [tripInfo, setTripInfo] = useState<TripInfoType | null>(null);
  const [trips, setTrips] = useState<TripInfoType[] | null>(TRIPS);
  const [activeTripInfo, setActiveTripInfo] = useState<TripInfoType | null>(null);

  const contextData = {
    // tripInfo,
    // setTripInfo,
    trips,
    setTrips,
    activeTripInfo,
    setActiveTripInfo,
  };
  return <TripContext.Provider value={contextData}>{children}</TripContext.Provider>;
};
