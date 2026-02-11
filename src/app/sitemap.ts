import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://amous-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/cases`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const { data: services } = await supabase
    .from("services")
    .select("slug, updated_at");

  const servicePages: MetadataRoute.Sitemap = (services || []).map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
