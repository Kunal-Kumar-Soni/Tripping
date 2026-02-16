import { TripContext } from "@/context/TripContext";
import { useContext } from "react";

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within an TripProvider");
  }
  return context;
};
