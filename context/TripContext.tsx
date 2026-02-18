"use client";
import { useAuth } from "@/hooks/useAuth";
import { createTrip, deleteSingleTrip, getSingleTrip, getTrips } from "@/services/trips";
import { CreateTrip, Trip } from "@/types/trips";
import { createContext, ReactNode, useEffect, useState } from "react";

interface TripContextType {
  trips: Trip[] | null;
  loadingTrips: boolean;
  selectedTrip: Trip | null;
  loadingSelectedTrip: boolean;
  error: string | null;
  selectTrip: (id: number) => Promise<void>;
  handleCreateSingleTrip: (trip: CreateTrip) => Promise<void>;
  handleDeleteSingleTrip: (id: number) => Promise<void>;
}

export const TripContext = createContext<TripContextType | null>(null);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loadingSelectedTrip, setLoadingSelectedTrip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, user } = useAuth();

  const sortedTripsByTime = (trips: Trip[]) => {
    return [...trips].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
  };

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

  const handleCreateSingleTrip = async (tripData: CreateTrip) => {
    try {
      setError(null);
      const newTrip = await createTrip(tripData);

      setTrips((prev) => {
        if (!prev) return [newTrip];
        const updated = sortedTripsByTime([...prev, newTrip]);
        return updated;
      });

      setSelectedTrip(newTrip);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteSingleTrip = async (id: number) => {
    try {
      setError(null);
      await deleteSingleTrip(id);

      setTrips((prev) => {
        if (!prev) return null;

        const updatedTrips = prev.filter((trip) => trip.id !== id);
        if (selectedTrip?.id === id) {
          setSelectedTrip(updatedTrips[0] ?? null);
        }
        return updatedTrips;
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isLoading || !user) return;

    const fetchTrips = async () => {
      try {
        setLoadingTrips(true);
        setError(null);
        const tripsData = await getTrips();
        const sortedByTime = sortedTripsByTime(tripsData);
        setTrips(sortedByTime);

        if (sortedByTime.length > 0) {
          await selectTrip(sortedByTime[0].id);
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
    handleCreateSingleTrip,
    handleDeleteSingleTrip,
  };

  return <TripContext.Provider value={tripData}>{children}</TripContext.Provider>;
};
