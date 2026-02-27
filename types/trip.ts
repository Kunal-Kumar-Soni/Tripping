export interface Trip {
  budget: number;
  created_at: string;
  end_date: string;
  id: number;
  start_date: string;
  status: string;
  title: string;
  updated_at: string;
  user_id: string;
}

export type CreateTrip = Omit<Trip, "created_at" | "id" | "status" | "updated_at" | "user_id">;
