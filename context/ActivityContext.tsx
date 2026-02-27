"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  createActivity,
  deleteSingleActivity,
  getActivities,
  updateSingleActivity,
} from "@/services/activity";
import { Activity, CreateActivity } from "@/types/activity";
import { createContext, ReactNode, useEffect, useState } from "react";

type ActivityContextType = {
  activities: Activity[];
  loadingActivities: boolean;
  error: string | null;
  handleCreateSingleActivity: (activityData: CreateActivity) => Promise<void>;
  handleUpdateSingleActivity: (activityId: number, activityData: CreateActivity) => Promise<void>;
  handleDeleteSingleActivity: (activityId: number) => Promise<void>;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, user } = useAuth();

  const handleCreateSingleActivity = async (activityData: CreateActivity) => {
    setError(null);
    try {
      const newActivity = await createActivity(activityData);
      setActivities((prev) => [...prev, newActivity]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateSingleActivity = async (activityId: number, activityData: CreateActivity) => {
    setError(null);
    try {
      const updateActivity = await updateSingleActivity(activityId, activityData);
      setActivities((prev) =>
        prev.map((activity) => (activity.id === activityId ? updateActivity : activity)),
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteSingleActivity = async (activityId: number) => {
    setError(null);
    try {
      await deleteSingleActivity(activityId);
      setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isLoading || !user) return;
    const fetchActivities = async () => {
      setError(null);
      setLoadingActivities(true);
      try {
        const res = await getActivities();
        setActivities(res);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, [isLoading, user]);

  const value: ActivityContextType = {
    activities,
    loadingActivities,
    error,
    handleCreateSingleActivity,
    handleUpdateSingleActivity,
    handleDeleteSingleActivity,
  };
  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export default ActivityProvider;
