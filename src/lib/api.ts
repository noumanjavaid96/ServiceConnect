import { supabase } from "./supabase";
import {
  Profile,
  ServiceLocation,
  WorkerDocument,
  WorkerRating,
} from "./types";

export const createProfile = async (
  profile: Omit<Profile, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createServiceLocation = async (
  location: Omit<ServiceLocation, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("service_locations")
    .insert([location])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const uploadWorkerDocument = async (
  profileId: string,
  file: File,
  documentType: string,
) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${profileId}/${documentType}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("worker-documents")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: document, error: docError } = await supabase
    .from("worker_documents")
    .insert([
      {
        profile_id: profileId,
        document_type: documentType,
        document_url: fileName,
      },
    ])
    .select()
    .single();

  if (docError) throw docError;
  return document;
};

export const getWorkerRatings = async (workerId: string) => {
  const { data, error } = await supabase
    .from("worker_ratings")
    .select(
      `
      *,
      customer:profiles!customer_id(*)
    `,
    )
    .eq("worker_id", workerId);

  if (error) throw error;
  return data;
};

export const createWorkerRating = async (
  rating: Omit<WorkerRating, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("worker_ratings")
    .insert([rating])
    .select()
    .single();

  if (error) throw error;
  return data;
};
