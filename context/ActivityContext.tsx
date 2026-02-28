"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  createActivity,
  deleteSingleActivity,
  getActivities,
  updateSingleActivity,
} from "@/services/activity";
import { Activity, CreateActivity } from "@/types/activity";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  // Create Activity
  const handleCreateSingleActivity = async (activityData: CreateActivity) => {
    setError(null);
    try {
      const newActivity = await createActivity(activityData);
      setActivities((prev) => [...prev, newActivity]);
      toast.success("Activity Added");
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Update Activity
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

  // Delete Activity
  const handleDeleteSingleActivity = async (activityId: number) => {
    setError(null);
    try {
      await deleteSingleActivity(activityId);
      setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Fetch Activities
  const fetchActivities = useCallback(async () => {
    if (!user?.uid) return;
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
  }, [user?.uid]);

  useEffect(() => {
    if (isLoading) return;

    if (user?.uid) {
      fetchActivities();
      console.count("Activities Api Call");
    } else {
      setActivities([]);
    }
  }, [isLoading, user?.uid, fetchActivities]);

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
