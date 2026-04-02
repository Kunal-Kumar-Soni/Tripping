import { ActivityType } from "./common";

export interface Activity {
  category: ActivityType;
  cost?: number;
  created_at: string;
  description?: string;
  duration?: number;
  id: number;
  lat?: number;
  lng?: number;
  location: string;
  name: string;
  place_id?: string;
  updated_at: string;
  user_id: string;
}

export type CreateActivity = Pick<
  Activity,
  "category" | "lat" | "lng" | "location" | "name" | "place_id"
>;
