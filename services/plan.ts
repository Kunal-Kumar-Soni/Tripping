import axiosInstance from "@/lib/axios";
import { DeleteResponse } from "@/types/common";
import { CreatePlan, Plan } from "@/types/plan";

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
