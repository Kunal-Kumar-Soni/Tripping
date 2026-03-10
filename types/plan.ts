export interface Plan {
  address?: string;
  created_at: string;
  end_date: string;
  end_time: string;
  id: number;
  location_name?: string;
  notes?: string;
  order_index?: number;
  section?: string;
  start_date: string;
  start_time: string;
  status?: string;
  title: string;
  trip_id?: number;
  type: string;
  updated_at: string;
}

export type CreatePlan = Omit<Plan, "created_at" | "id" | "trip_id" | "updated_at">;

export type DragType = "activity" | "timeline";

export interface PlanTransport {
  arrive_date: string;
  arrive_time: string;
  created_at: string;
  depart_date: string;
  depart_time: string;
  from_item_id: number;
  id: number;
  mode: string;
  notes: string;
  order_index: number;
  to_item_id: number;
  trip_id: number;
  updated_at: string;
}

export type CreatePlanTransport = Omit<
  PlanTransport,
  "created_at" | "id" | "trip_id" | "updated_at"
>;
