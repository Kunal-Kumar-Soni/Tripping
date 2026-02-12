import axiosInstance from "@/lib/axios";
import { CreateTrip } from "@/types/trips";

//! All Trips
export const getTrips = async () => {
  const res = await axiosInstance.get(`/api/trips`);
  return res.data;
};

export const createTrip = async (data: CreateTrip) => {
  const res = await axiosInstance.post(`/api/trips`, data);
  return res.data;
};

//! Individual Trip
export const getSingleTrip = async (tripId: number) => {
  const res = await axiosInstance.get(`/api/trips/${tripId}`);
  return res.data;
};

export const updateSingleTrip = async (tripId: number, data: CreateTrip) => {
  const res = await axiosInstance.put(`/api/trips/${tripId}`, data);
  return res.data;
};

export const deleteSingleTrip = async (tripId: number) => {
  const res = await axiosInstance.delete(`/api/trips/${tripId}`);
  return res.data;
};
