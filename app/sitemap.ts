import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";

const routes = ["", "/about", "/contact", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    }))
  );
}
