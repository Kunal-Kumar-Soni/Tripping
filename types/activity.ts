export interface Activity {
  category: string;
  cost?: number;
  created_at: string;
  description?: string;
  duration?: number;
  id: number;
  location: string;
  name: string;
  updated_at: string;
  user_id: string;
}

export type CreateActivity = Omit<
  Activity,
  "cost" | "created_at" | "description" | "duration" | "id" | "updated_at" | "user_id"
>;
