"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  createActivity,
  deleteSingleActivity,
  getActivities,
  updateSingleActivity,
} from "@/services/activity";
import { Activity, CreateActivity } from "@/types/activity";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type ActivityContextType = {
  activities: Activity[];
  setActivities: Dispatch<SetStateAction<Activity[]>>;
  loadingActivities: boolean;
  error: string | null;
  mutationType: "create" | "update" | "delete" | null;
  handleCreateSingleActivity: (activityData: CreateActivity) => Promise<void>;
  handleUpdateSingleActivity: (activityId: number, activityData: CreateActivity) => Promise<void>;
  handleDeleteSingleActivity: (activityId: number) => Promise<void>;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mutationType, setMutationType] = useState<"create" | "update" | "delete" | null>(null);

  const { isLoading, user } = useAuth();

  // Create Activity
  const handleCreateSingleActivity = async (activityData: CreateActivity) => {
    setError(null);
    setMutationType("create");
    try {
      const newActivity = await createActivity(activityData);
      setActivities((prev) => [newActivity, ...(prev ?? [])]);
      toast.success("Activity Added");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  // Update Activity
  const handleUpdateSingleActivity = async (activityId: number, activityData: CreateActivity) => {
    setError(null);
    setMutationType("update");
    try {
      const updateActivity = await updateSingleActivity(activityId, activityData);
      setActivities((prev) =>
        prev.map((activity) => (activity.id === activityId ? updateActivity : activity)),
      );
      toast.success("Activity Updated");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  // Delete Activity
  const handleDeleteSingleActivity = async (activityId: number) => {
    setError(null);
    setMutationType("delete");
    try {
      await deleteSingleActivity(activityId);
      setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  // Fetch Activities
  const fetchActivities = useCallback(async () => {
    if (!user?.uid) return;
    setError(null);
    try {
      const res = await getActivities();
      setActivities(res ?? []);
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
    } else {
      setActivities([]);
    }
  }, [isLoading, fetchActivities]);

  const value: ActivityContextType = {
    activities,
    setActivities,
    loadingActivities,
    error,
    mutationType,
    handleCreateSingleActivity,
    handleUpdateSingleActivity,
    handleDeleteSingleActivity,
  };
  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};
