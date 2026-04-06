"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import { useTrip } from "@/hooks/useTrip";
import { getErrorMessage } from "@/lib/error";
import { getTransports } from "@/services/transport";
import { Transport } from "@/types/transport";

type TripContextType = {
  transports: Transport[];
  transportLoading: boolean;
  error: string | null;
};

export const TransportContext = createContext<TripContextType | null>(null);

export const TransportProvider = ({ children }: { children: ReactNode }) => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [transportLoading, setTransportLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoading } = useAuth();
  const { selectedTrip } = useTrip();

  const fetchTransport = useCallback(async () => {
    if (!user?.uid || !selectedTrip) return;

    setError(null);

    try {
      const res = await getTransports(selectedTrip.id);
      setTransports(res ?? []);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
    } finally {
      setTransportLoading(false);
    }
  }, [user?.uid, selectedTrip]);

  useEffect(() => {
    if (isLoading) return;

    if (user?.uid) {
      fetchTransport();
    } else {
      setTransports([]);
      setError(null);
    }
  }, [isLoading, fetchTransport, user?.uid]);

  const value: TripContextType = {
    transports,
    transportLoading,
    error,
  };

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
};
