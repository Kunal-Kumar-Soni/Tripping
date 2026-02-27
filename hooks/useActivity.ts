import { ActivityContext } from "@/context/ActivityContext";
import { useContext } from "react";

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};
