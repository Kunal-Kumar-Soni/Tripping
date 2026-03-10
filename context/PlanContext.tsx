"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTrip } from "@/hooks/useTrip";
import { getPlans, updateSinglePlan } from "@/services/plan";
import { CreatePlan, Plan } from "@/types/plan";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

type PlanContextType = {
  plans: Plan[];
  loadingPlans: boolean;
  error: string | null;
  mutationType: "update" | null;
  handleUpdateSinglePlan: (planId: number, payload: CreatePlan) => Promise<void>;
};

export const PlanContext = createContext<PlanContextType | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mutationType, setMutationType] = useState<"update" | null>(null);

  const { user, isLoading } = useAuth();
  const { selectedTrip } = useTrip();

  const handleUpdateSinglePlan = async (planId: number, payload: CreatePlan) => {
    if (!selectedTrip) return;

    const oldPlans = plans;

    setPlans((prev) => prev.map((item) => (item.id === planId ? { ...item, ...payload } : item)));

    setError(null);
    setMutationType("update");
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
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
