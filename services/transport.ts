import axiosInstance from "@/lib/axios";
import { DeleteResponse } from "@/types/common";
import { CreateTransport, Transport } from "@/types/transport";

//! All Plan Transports
export const getTransports = async (tripId: number): Promise<Transport[]> => {
  const { data } = await axiosInstance.get<Transport[]>(
    `/api/trips/${tripId}/plan-transports`,
  );
  return data;
};

//! Individual Plan Transport
export const createTransport = async (
  tripId: number,
  planTransportData: CreateTransport,
): Promise<Transport> => {
  const { data } = await axiosInstance.post<Transport>(
    `/api/trips/${tripId}/plan-transports`,
    planTransportData,
  );
  return data;
};

export const updateTransport = async (
  tripId: number,
  transportId: number,
  planTransportData: CreateTransport,
): Promise<Transport> => {
  const { data } = await axiosInstance.put<Transport>(
    `/api/trips/${tripId}/plan-transports/${transportId}`,
    planTransportData,
  );
  return data;
};

export const deleteTransport = async (
  tripId: number,
  transportId: number,
): Promise<DeleteResponse> => {
  const { data } = await axiosInstance.delete<DeleteResponse>(
    `/api/trips/${tripId}/plan-transports/${transportId}`,
  );
  return data;
};
