import { PlanContext } from "@/context/PlanContext";
import { useContext } from "react";

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within an PlanProvider");
  }
  return context;
};
