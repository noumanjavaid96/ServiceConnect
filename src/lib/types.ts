export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  description?: string;
  photo_url?: string;
  user_type: "worker" | "customer";
  created_at?: string;
  updated_at?: string;
}

export interface ServiceLocation {
  id: string;
  profile_id: string;
  city: string;
  state: string;
  zip_code: string;
  service_radius?: number;
  created_at?: string;
}

export interface WorkerDocument {
  id: string;
  profile_id: string;
  document_type: string;
  document_url: string;
  verified: boolean;
  created_at?: string;
}

export interface WorkerRating {
  id: string;
  worker_id: string;
  customer_id: string;
  rating: number;
  review?: string;
  created_at?: string;
}
