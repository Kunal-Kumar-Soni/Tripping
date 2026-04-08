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
import {
  createTransport,
  deleteTransport,
  getTransports,
  updateTransport,
} from "@/services/transport";
import { CreateTransport, Transport } from "@/types/transport";

type TripContextType = {
  transports: Transport[];
  transportLoading: boolean;
  error: string | null;
  mutationType: "create" | "update" | "delete" | null;
  handleCreateSingleTransport: (
    transportData: CreateTransport,
  ) => Promise<void>;
  handleUpdateSingleTransport: (
    transportId: number,
    transportData: CreateTransport,
  ) => Promise<void>;
  handleDeleteSingleTransport: (transportId: number) => Promise<void>;
};

export const TransportContext = createContext<TripContextType | null>(null);

export const TransportProvider = ({ children }: { children: ReactNode }) => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [transportLoading, setTransportLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mutationType, setMutationType] = useState<
    "create" | "update" | "delete" | null
  >(null);

  const { user, isLoading } = useAuth();
  const { selectedTrip } = useTrip();

  const handleCreateSingleTransport = async (
    transportData: CreateTransport,
  ) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("create");
    try {
      const res = await createTransport(selectedTrip.id, transportData);
      setTransports((prev) => [...prev, res]);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    } finally {
      setMutationType(null);
    }
  };

  const handleUpdateSingleTransport = async (
    transportId: number,
    transportData: CreateTransport,
  ) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("update");
    try {
      const res = await updateTransport(
        selectedTrip.id,
        transportId,
        transportData,
      );
      setTransports((prev) => [...prev, res]);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
    } finally {
      setMutationType(null);
    }
  };

  const handleDeleteSingleTransport = async (transportId: number) => {
    if (!selectedTrip) return;
    setError(null);
    setMutationType("delete");
    try {
      await deleteTransport(selectedTrip.id, transportId);
      setTransports((prev) => prev.filter((item) => item.id !== transportId));
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError(message);
      setMutationType(null);
    }
  };

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
    mutationType,
    handleCreateSingleTransport,
    handleUpdateSingleTransport,
    handleDeleteSingleTransport,
  };

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
};
