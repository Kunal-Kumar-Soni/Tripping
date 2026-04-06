import { ActivityType } from "./common";

export interface Plan {
  address?: string;
  created_at: string;
  end_date: string;
  end_time: string;
  id: number;
  lat?: number;
  lng?: number;
  location_name?: string;
  notes?: string;
  order_index?: number;
  place_id?: string;
  section?: string;
  start_date: string;
  start_time: string;
  status?: string;
  title: string;
  trip_id?: number;
  type: ActivityType;
  updated_at: string;
}

export type CreatePlan = Omit<
  Plan,
  "created_at" | "id" | "trip_id" | "updated_at"
>;

export type DragType = "activity" | "timeline";
