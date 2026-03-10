"use client";
import { useActivity } from "@/hooks/useActivity";
import { useAuth } from "@/hooks/useAuth";
import { useTrip } from "@/hooks/useTrip";
import { createActivity } from "@/services/activity";
import { createPlan, deleteSinglePlan, getPlans, updateSinglePlan } from "@/services/plan";
import { Activity, CreateActivity } from "@/types/activity";
import { CreatePlan, Plan } from "@/types/plan";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

type PlanContextType = {
  plans: Plan[];
  loadingPlans: boolean;
  error: string | null;
  mutationType: "create" | "update" | "move" | null;
  handleUpdateSinglePlan: (planId: number, payload: CreatePlan) => Promise<void>;
  handlePlanActivityToTimeline: (payload: CreatePlan, activityId: number) => Promise<void>;
  handlePlanTimelineToActivity: (payload: CreateActivity, planId: number) => Promise<void>;
};

export const PlanContext = createContext<PlanContextType | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mutationType, setMutationType] = useState<"create" | "update" | "move" | null>(null);

  const { user, isLoading } = useAuth();
  const { selectedTrip } = useTrip();
  const { activities, setActivities, handleDeleteSingleActivity } = useActivity();

  const handleUpdateSinglePlan = async (planId: number, payload: CreatePlan) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("update");

    const oldPlans = plans;

    setPlans((prev) => prev.map((item) => (item.id === planId ? { ...item, ...payload } : item)));

    try {
      const res = await updateSinglePlan(selectedTrip.id, planId, payload);
      setPlans((prev) => prev.map((item) => (item.id === res.id ? res : item)));
    } catch (error: any) {
      setPlans(oldPlans);
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  const handlePlanActivityToTimeline = async (payload: CreatePlan, activityId: number) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("create");

    const oldPlans = plans;
    const oldActivities = activities;

    const optimisticPlan = {
      id: Date.now(),
      ...payload,
    } as Plan;

    setActivities((prev) => prev.filter((item) => item.id !== activityId));
    setPlans((prev) => [optimisticPlan, ...prev]);

    try {
      const res = await createPlan(selectedTrip.id, payload);
      setPlans((prev) => prev.map((item) => (item.id === optimisticPlan.id ? res : item)));
      await handleDeleteSingleActivity(activityId);
    } catch (error: any) {
      setPlans(oldPlans);
      setActivities(oldActivities);
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  const handlePlanTimelineToActivity = async (payload: CreateActivity, planId: number) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("move");

    const oldPlans = plans;
    const oldActivities = activities;

    const optimisticActivity = {
      id: Date.now(),
      ...payload,
    } as Activity;

    setPlans((prev) => prev.filter((item) => item.id !== planId));
    setActivities((prev) => [optimisticActivity, ...prev]);

    try {
      await deleteSinglePlan(selectedTrip.id, planId);
      const res = await createActivity(payload);

      setActivities((prev) => prev.map((item) => (item.id === optimisticActivity.id ? res : item)));
    } catch (error: any) {
      setPlans(oldPlans);
      setActivities(oldActivities);
      setError(error.message);
    } finally {
      setMutationType(null);
    }
  };

  const fetchPlans = useCallback(async () => {
    if (!user?.uid || !selectedTrip) return;

    setLoadingPlans(true);
    setError(null);

    try {
      const res = await getPlans(selectedTrip.id);
      if (res) {
        setPlans(res);
      } else {
        setPlans([]);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingPlans(false);
    }
  }, [user?.uid, selectedTrip?.id]);

  useEffect(() => {
    if (isLoading) return;

    if (user?.uid) {
      fetchPlans();
    } else {
      setPlans([]);
    }
  }, [isLoading, fetchPlans]);

  const value: PlanContextType = {
    plans,
    loadingPlans,
    error,
    mutationType,
    handleUpdateSinglePlan,
    handlePlanActivityToTimeline,
    handlePlanTimelineToActivity,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
