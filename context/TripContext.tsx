"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  createTrip,
  deleteSingleTrip,
  getSingleTrip,
  getTrips,
  updateSingleTrip,
} from "@/services/trip";
import { CreateTrip, Trip } from "@/types/trip";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type TripContextType = {
  trips: Trip[];
  loadingTrips: boolean;
  selectedTrip: Trip | null;
  loadingSelectedTrip: boolean;
  error: string | null;
  selectTrip: (id: number) => Promise<void>;
  handleCreateSingleTrip: (tripData: CreateTrip) => Promise<void>;
  handleUpdateSingleTrip: (tripId: number, tripData: CreateTrip) => Promise<void>;
  handleDeleteSingleTrip: (id: number) => Promise<void>;
};

export const TripContext = createContext<TripContextType | null>(null);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loadingSelectedTrip, setLoadingSelectedTrip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, user } = useAuth();

  // Sorted Trips By Time
  const sortedTripsByTime = (trips: Trip[]) => {
    return [...trips].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
  };

  // Select Trip Function
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

  // Create Trip
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
      toast.success(`${tripData?.title} trip created..`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Update Trip
  const handleUpdateSingleTrip = async (tripId: number, tripData: CreateTrip) => {
    try {
      setError(null);
      const updatedTrip = await updateSingleTrip(tripId, tripData);
      setTrips((prev) => prev.map((trip) => (trip.id === tripId ? updatedTrip : trip)));
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(updatedTrip);
      }
      toast.success("Trip updated.");
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Delete Trip
  const handleDeleteSingleTrip = async (tripId: number) => {
    try {
      setError(null);
      await deleteSingleTrip(tripId);

      setTrips((prev) => {
        const updatedTrips = prev.filter((trip) => trip.id !== tripId);
        if (selectedTrip?.id === tripId) {
          setSelectedTrip(updatedTrips[0] ?? null);
        }
        return updatedTrips.length === 0 ? [] : updatedTrips;
      });
      toast.success(`${selectedTrip?.title} trip deleted.`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Fetch Trips
  const fetchTrips = useCallback(async () => {
    if (!user?.uid) return;
    setError(null);
    setLoadingTrips(true);
    try {
      const tripsData = await getTrips();
      const sortedByTime = sortedTripsByTime(tripsData);
      setTrips(sortedByTime);

      if (sortedByTime.length > 0) {
        setSelectedTrip(sortedByTime[0]);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingTrips(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (isLoading) return;

    if (user?.uid) {
      fetchTrips();
    } else {
      setTrips([]);
      setSelectedTrip(null);
    }
  }, [isLoading, fetchTrips]);

  const value: TripContextType = {
    trips,
    loadingTrips,
    selectedTrip,
    loadingSelectedTrip,
    error,
    selectTrip,
    handleCreateSingleTrip,
    handleUpdateSingleTrip,
    handleDeleteSingleTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
