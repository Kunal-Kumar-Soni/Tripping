"use client";
import { useAuth } from "@/hooks/useAuth";
import { getSingleTrip, getTrips } from "@/services/trips";
import { Trip } from "@/types/trips";
import { createContext, ReactNode, useEffect, useState } from "react";

interface TripContextType {
  trips: Trip[] | null;
  loadingTrips: boolean;
  selectedTrip: Trip | null;
  loadingSelectedTrip: boolean;
  error: string | null;
  selectTrip: (id: number) => Promise<void>;
}

export const TripContext = createContext<TripContextType | null>(null);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loadingSelectedTrip, setLoadingSelectedTrip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, user } = useAuth();

  const selectTrip = async (id: number) => {
    try {
      setLoadingSelectedTrip(true);
      setError(null);
      const selectTripData = await getSingleTrip(id);
      setSelectedTrip(selectTripData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingSelectedTrip(false);
    }
  };

  useEffect(() => {
    if (isLoading || !user) return;

    const fetchTrips = async () => {
      try {
        setLoadingTrips(true);
        setError(null);
        const tripsData = await getTrips();
        setTrips(tripsData);

        if (tripsData.length > 0 && !selectedTrip) {
          await selectTrip(tripsData[0].id);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoadingTrips(false);
      }
    };
    fetchTrips();
  }, [isLoading, user]);

  useEffect(() => {
    if (!user) {
      setTrips(null);
      setSelectedTrip(null);
    }
  }, [user]);

  const tripData = {
    trips,
    loadingTrips,
    selectedTrip,
    loadingSelectedTrip,
    error,
    selectTrip,
  };

  return <TripContext.Provider value={tripData}>{children}</TripContext.Provider>;
};
