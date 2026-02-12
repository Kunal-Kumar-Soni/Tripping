import axiosInstance from "@/lib/axios";
import { CreatePlan, CreatePlanTransport } from "@/types/plan";

//! All plan
export const getPlans = async (tripId: number) => {
  const res = await axiosInstance.get(`/api/trips/${tripId}/plan-items`);
  return res.data;
};

//! Individual Plan
export const createPlan = async (tripId: number, data: CreatePlan) => {
  const res = await axiosInstance.post(`/api/trips/${tripId}/plan-items`, data);
  return res.data;
};

export const getSinglePlan = async (tripId: number, itemId: number) => {
  const res = await axiosInstance.get(`/api/trips/${tripId}/plan-items/${itemId}`);
  return res.data;
};

export const updateSinglePlan = async (tripId: number, itemId: number, data: CreatePlan) => {
  const res = await axiosInstance.put(`/api/trips/${tripId}/plan-items/${itemId}`, data);
  return res.data;
};

export const deleteSinglePlan = async (tripId: number, itemId: number) => {
  const res = await axiosInstance.delete(`/api/trips/${tripId}/plan-items/${itemId}`);
  return res.data;
};

//! Plan Transport
export const getPlanTransports = async (tripId: number) => {
  const res = await axiosInstance.get(`/api/trips/${tripId}/plan-transports`);
  return res.data;
};

export const createPlanTransport = async (tripId: number, data: CreatePlanTransport) => {
  const res = await axiosInstance.post(`/api/trips/${tripId}/plan-transports`, data);
  return res.data;
};

export const updatePlanTransport = async (
  tripId: number,
  transportId: number,
  data: CreatePlanTransport,
) => {
  const res = await axiosInstance.put(`/api/trips/${tripId}/plan-transports/${transportId}`, data);
  return res.data;
};

export const deletePlanTransport = async (tripId: number, transportId: number) => {
  const res = await axiosInstance.delete(`/api/trips/${tripId}/plan-transports/${transportId}`);
  return res.data;
};
