import { useContext } from "react";

import { TransportContext } from "@/context/TransportContext";

export const useTransport = () => {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error("useTransport must be used within an TransportProvider");
  }
  return context;
};
