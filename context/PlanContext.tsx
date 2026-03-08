import { createContext, ReactNode } from "react";

export const PlanContext = createContext(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  <PlanContext.Provider value={null}>{children}</PlanContext.Provider>;
};
