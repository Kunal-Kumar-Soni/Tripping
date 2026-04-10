export type TransportType = "driving" | "walking" | "transit" | "flight";
export interface Transport {
  arrive_date?: string;
  arrive_time?: string;
  created_at: string;
  depart_date?: string;
  depart_time?: string;
  distance_meters?: number;
  distance_text?: string;
  duration_seconds?: number;
  duration_text?: string;
  from_item_id: number;
  id: number;
  mode: TransportType;
  notes?: string;
  order_index?: number;
  to_item_id: number;
  trip_id: number;
  updated_at: string;
}

export type CreateTransport = Omit<
  Transport,
  "created_at" | "id" | "trip_id" | "updated_at"
>;
