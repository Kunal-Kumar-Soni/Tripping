import { DeleteResponse } from "@/types/common";
import { CreateTrip, Trip } from "@/types/trip";

import axiosInstance from "@/lib/axios";

//! All Trips
export const getTrips = async (): Promise<Trip[]> => {
  const { data } = await axiosInstance.get<Trip[]>(`/api/trips`);
  return data;
};

//! Individual Trip
export const createTrip = async (tripData: CreateTrip): Promise<Trip> => {
  const { data } = await axiosInstance.post<Trip>(`/api/trips`, tripData);
  return data;
};

export const getSingleTrip = async (tripId: number): Promise<Trip> => {
  const { data } = await axiosInstance.get<Trip>(`/api/trips/${tripId}`);
  return data;
};

export const updateSingleTrip = async (
  tripId: number,
  tripData: CreateTrip,
): Promise<Trip> => {
  const { data } = await axiosInstance.put<Trip>(
    `/api/trips/${tripId}`,
    tripData,
  );
  return data;
};

export const deleteSingleTrip = async (
  tripId: number,
): Promise<DeleteResponse> => {
  const { data } = await axiosInstance.delete<DeleteResponse>(
    `/api/trips/${tripId}`,
  );
  return data;
};
