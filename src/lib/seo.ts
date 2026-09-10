// SEO helpers (brief section 11.8). Single place for the canonical base URL.

export const SITE_URL = "https://www.volumeslab.com";

export function canonical(path: string): { rel: "canonical"; href: string } {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return { rel: "canonical", href: `${SITE_URL}${clean}` };
}
