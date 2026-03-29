"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { CreateTrip, Trip } from "@/types/trip";

import { getErrorMessage } from "@/lib/error";

import { useAuth } from "@/hooks/useAuth";

import {
  createTrip,
  deleteSingleTrip,
  getSingleTrip,
  getTrips,
  updateSingleTrip,
} from "@/services/trip";

type Mutation = "create" | "update" | "delete";
type TripContextType = {
  trips: Trip[];
  loadingTrips: boolean;
  selectedTrip: Trip | null;
  loadingSelectedTrip: boolean;
  error: string | null;
  mutationType: Mutation | null;
  selectTrip: (id: number) => Promise<void>;
  handleCreateSingleTrip: (tripData: CreateTrip) => Promise<void>;
  handleUpdateSingleTrip: (
    tripId: number,
    tripData: CreateTrip,
  ) => Promise<void>;
  handleDeleteSingleTrip: (id: number) => Promise<void>;
};

export const TripContext = createContext<TripContextType | null>(null);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loadingSelectedTrip, setLoadingSelectedTrip] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mutationType, setMutationType] = useState<Mutation | null>(null);

  const { isLoading, user } = useAuth();

  // Sorted Trips By Time
  const sortedTripsByTime = (trips: Trip[]) => {
    return [...trips].sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
  };

  // Select Trip Function
  const selectTrip = async (id: number) => {
    try {
      setLoadingSelectedTrip(true);
      setError(null);
      const selectTripData = await getSingleTrip(id);

      setSelectedTrip(selectTripData);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
    } finally {
      setLoadingSelectedTrip(false);
    }
  };

  // Create Trip
  const handleCreateSingleTrip = async (tripData: CreateTrip) => {
    setError(null);
    setMutationType("create");
    try {
      const newTrip = await createTrip(tripData);
      setTrips((prev) => {
        const updated = sortedTripsByTime([...prev, newTrip]);
        return updated;
      });
      setSelectedTrip(newTrip);
      toast.success(
        tripData ? `${tripData?.title} trip created.` : "Trip created",
      );
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setMutationType(null);
    }
  };

  // Update Trip
  const handleUpdateSingleTrip = async (
    tripId: number,
    tripData: CreateTrip,
  ) => {
    setError(null);
    setMutationType("update");
    try {
      const updatedTrip = await updateSingleTrip(tripId, tripData);
      setTrips((prev) =>
        prev.map((trip) => (trip.id === tripId ? updatedTrip : trip)),
      );
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(updatedTrip);
      }
      toast.success("Trip updated.");
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setMutationType(null);
    }
  };

  // Delete Trip
  const handleDeleteSingleTrip = async (tripId: number) => {
    setError(null);
    setMutationType("delete");
    try {
      const deletedTripTitle = selectedTrip?.title;
      await deleteSingleTrip(tripId);

      setTrips((prev) => {
        const updatedTrips = prev.filter((trip) => trip.id !== tripId);
        if (selectedTrip?.id === tripId) {
          setSelectedTrip(updatedTrips[0] ?? null);
        }
        return updatedTrips.length === 0 ? [] : updatedTrips;
      });
      toast.success(
        deletedTripTitle ? `${deletedTripTitle} trip deleted.` : "Trip deleted",
      );
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setMutationType(null);
    }
  };

  // Fetch Trips
  const fetchTrips = useCallback(async () => {
    if (!user?.uid) {
      setLoadingTrips(false);
      return;
    }

    setLoadingTrips(true);
    setError(null);
    try {
      const tripsData = await getTrips();
      const sortedByTime = sortedTripsByTime(tripsData);
      setTrips(sortedByTime);

      if (sortedByTime.length > 0) {
        setSelectedTrip(sortedByTime[0]);
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
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
      setError(null);
    }
  }, [isLoading, fetchTrips, user?.uid]);

  const value: TripContextType = {
    trips,
    loadingTrips,
    selectedTrip,
    loadingSelectedTrip,
    error,
    selectTrip,
    mutationType,
    handleCreateSingleTrip,
    handleUpdateSingleTrip,
    handleDeleteSingleTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
