"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTrip } from "@/hooks/useTrip";
import { getPlans } from "@/services/plan";
import { Plan } from "@/types/plan";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

type PlanContextType = {
  plans: Plan[];
  loadingPlans: boolean;
  error: string | null;
};

export const PlanContext = createContext<PlanContextType | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoading } = useAuth();
  const { selectedTrip } = useTrip();

  const fetchPlans = useCallback(async () => {
    if (!user?.uid || !selectedTrip) return;

    setLoadingPlans(true);
    setError(null);

    try {
      const res = await getPlans(selectedTrip.id);
      setPlans(res);
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
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
