import axiosInstance from "@/lib/axios";

import { DeleteResponse } from "@/types/common";
import {
  CreatePlan,
  CreatePlanTransport,
  Plan,
  PlanTransport,
} from "@/types/plan";

//! All plans
export const getPlans = async (tripId: number): Promise<Plan[]> => {
  const { data } = await axiosInstance.get<Plan[]>(
    `/api/trips/${tripId}/plan-items`,
  );
  return data;
};

//! Individual Plan
export const createPlan = async (
  tripId: number,
  planData: CreatePlan,
): Promise<Plan> => {
  const { data } = await axiosInstance.post<Plan>(
    `/api/trips/${tripId}/plan-items`,
    planData,
  );
  return data;
};

export const getSinglePlan = async (
  tripId: number,
  planId: number,
): Promise<Plan> => {
  const { data } = await axiosInstance.get<Plan>(
    `/api/trips/${tripId}/plan-items/${planId}`,
  );
  return data;
};

export const updateSinglePlan = async (
  tripId: number,
  planId: number,
  planData: CreatePlan,
): Promise<Plan> => {
  const { data } = await axiosInstance.put<Plan>(
    `/api/trips/${tripId}/plan-items/${planId}`,
    planData,
  );
  return data;
};

export const deleteSinglePlan = async (
  tripId: number,
  planId: number,
): Promise<DeleteResponse> => {
  const { data } = await axiosInstance.delete<DeleteResponse>(
    `/api/trips/${tripId}/plan-items/${planId}`,
  );
  return data;
};

//! All Plan Transports
export const getPlanTransports = async (
  tripId: number,
): Promise<PlanTransport[]> => {
  const { data } = await axiosInstance.get<PlanTransport[]>(
    `/api/trips/${tripId}/plan-transports`,
  );
  return data;
};

//! Individual Plan Transport
export const createPlanTransport = async (
  tripId: number,
  planTransportData: CreatePlanTransport,
): Promise<PlanTransport> => {
  const { data } = await axiosInstance.post<PlanTransport>(
    `/api/trips/${tripId}/plan-transports`,
    planTransportData,
  );
  return data;
};

export const updatePlanTransport = async (
  tripId: number,
  transportId: number,
  planTransportData: CreatePlanTransport,
): Promise<PlanTransport> => {
  const { data } = await axiosInstance.put<PlanTransport>(
    `/api/trips/${tripId}/plan-transports/${transportId}`,
    planTransportData,
  );
  return data;
};

export const deletePlanTransport = async (
  tripId: number,
  transportId: number,
): Promise<DeleteResponse> => {
  const { data } = await axiosInstance.delete<DeleteResponse>(
    `/api/trips/${tripId}/plan-transports/${transportId}`,
  );
  return data;
};
