import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export interface SiteContent {
  id: string;
  value: string;
  updated_at: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
  page_content: string | null;
  curriculum: string | null;
  image_url: string | null;
  sort_order: number;
  updated_at: string;
}

export interface Instructor {
  id: number;
  service_id: number | null;
  service_ids: number[] | null;
  name: string;
  role: string | null;
  description: string | null;
  specialties: string[];
  certifications: string[] | null;
  career: string | null;
  lecture_history: string | null;
  image_url: string | null;
  sort_order: number;
  updated_at: string;
}

export interface Case {
  id: number;
  category: string;
  company: string | null;
  title: string;
  content: string | null;
  result: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Affiliate {
  id: number;
  name: string;
  name_en: string | null;
  description: string | null;
  features: string[];
  icon: string | null;
  sort_order: number;
  updated_at: string;
}

// Data fetching helpers
export async function getSiteContent(): Promise<Record<string, string>> {
  const { data } = await supabase.from("site_content").select("*");
  if (!data) return {};
  return Object.fromEntries(data.map((item: SiteContent) => [item.id, item.value]));
}

export async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getInstructorsByService(serviceId: number): Promise<Instructor[]> {
  const { data } = await supabase
    .from("instructors")
    .select("*")
    .eq("service_id", serviceId)
    .order("sort_order");
  return data || [];
}

export async function getAllInstructors(): Promise<Instructor[]> {
  const { data } = await supabase
    .from("instructors")
    .select("*")
    .order("sort_order");
  return data || [];
}

export async function getCases(category?: string, limit?: number): Promise<Case[]> {
  let query = supabase
    .from("cases")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  if (limit) {
    query = query.limit(limit);
  }
  const { data } = await query;
  return data || [];
}

export async function getAffiliates(): Promise<Affiliate[]> {
  const { data } = await supabase
    .from("affiliates")
    .select("*")
    .order("sort_order");
  return data || [];
}
