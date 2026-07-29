import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/uslugi",
    "/tseni",
    "/obekti",
    "/kontakt",
    "/bezplaten-ogled",
    "/politika-za-poveritelnost",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/bezplaten-ogled" ? 0.9 : 0.7,
  }));
}
