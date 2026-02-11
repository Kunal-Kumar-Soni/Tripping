export interface Trip {
  budget: number;
  created_at: string;
  description: string;
  destination: string;
  end_date: string;
  id: string;
  start_date: string;
  status: string;
  title: string;
  updated_at: string;
  user_id: string;
}

export interface CreateTrip {
  budget: number;
  description: string;
  destination: string;
  end_date: string;
  start_date: string;
  status: string;
  title: string;
}
