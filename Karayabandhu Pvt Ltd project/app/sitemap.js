export default async function sitemap() {
  const baseUrl = "https://karayabandhu.com";

  // Public indexable routes
  const routes = ["", "/press", "/privacy", "/terms", "/vision-mission", "/vision", "/mission"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
