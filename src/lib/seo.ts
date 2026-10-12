// SEO helpers (brief section 11.8). Single place for the canonical base URL.

export const SITE_URL = "https://www.volumeslab.com";

export function canonical(path: string): { rel: "canonical"; href: string } {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return { rel: "canonical", href: `${SITE_URL}${clean}` };
}

/** Keep search and sharing descriptions within the editorial 150-character limit. */
export function metaDescription(value: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  const chars = Array.from(text);
  if (chars.length <= 150) return text;
  const prefix = chars.slice(0, 149).join("");
  const sentences = prefix.match(/^.*[.!?](?=\s|$)/u)?.[0];
  if (sentences) return sentences;
  const boundary = prefix.lastIndexOf(" ");
  return `${boundary > 0 ? prefix.slice(0, boundary) : prefix}…`;
}

// Dedicated search copy leaves the full article excerpts available in the journal.
const articleDescriptions: Record<string, string> = {
  "why-vo2max-matters": "Learn what VO2max measures, how it relates to longevity and how lab testing can help guide your training.",
  "hyperbaric-chamber-madrid": "Explore hyperbaric oxygen sessions at Volumes Lab in Madrid: what to expect, how to prepare and how to book your first visit.",
  "glp-1-madrid-medical-consultation": "Learn what a GLP-1 medical consultation in Madrid involves, including suitability, prescriptions and questions to discuss with your doctor.",
};

export function articleMetaDescription(slug: string, excerpt: string): string {
  return metaDescription(articleDescriptions[slug] ?? excerpt);
}
