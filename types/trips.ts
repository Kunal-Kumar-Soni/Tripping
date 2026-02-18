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

export interface CreateTrip {
  budget: number;
  end_date: string;
  start_date: string;
  title: string;
}
