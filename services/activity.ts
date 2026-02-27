import axiosInstance from "@/lib/axios";
import { Activity, CreateActivity } from "@/types/activity";
import { DeleteResponse } from "@/types/common";

//! All Activities
export const getActivities = async (): Promise<Activity[]> => {
  const { data } = await axiosInstance.get<Activity[]>("api/activities");
  return data;
};

//! Individual Activity
export const createActivity = async (activityData: CreateActivity): Promise<Activity> => {
  const { data } = await axiosInstance.post<Activity>("api/activities", activityData);
  return data;
};

export const getSingleActivity = async (activityId: number): Promise<Activity> => {
  const { data } = await axiosInstance.get<Activity>(`api/activities/${activityId}`);
  return data;
};

export const updateSingleActivity = async (activityId: number, activityData: CreateActivity) => {
  const { data } = await axiosInstance.put<Activity>(`api/activities/${activityId}`, activityData);
  return data;
};

export const deleteSingleActivity = async (activityId: number): Promise<DeleteResponse> => {
  const { data } = await axiosInstance.delete<DeleteResponse>(`api/activities/${activityId}`);
  return data;
};
