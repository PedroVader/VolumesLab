// Breadcrumbs with structured data (brief 11.8). Renders an accessible trail
// plus a JSON-LD BreadcrumbList for search engines.

import { Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

export type Crumb = { name: string; to?: string; params?: Record<string, string>; hash?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.to ? { item: `${SITE_URL}${resolve(c.to, c.params)}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-widest text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} params={c.params} hash={c.hash} className="hover:text-primary">
                {c.name}
              </Link>
            ) : (
              <span className={i === items.length - 1 ? "text-foreground" : undefined} aria-current={i === items.length - 1 ? "page" : undefined}>
                {c.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

function resolve(to: string, params?: Record<string, string>): string {
  if (!params) return to;
  return Object.entries(params).reduce((acc, [k, v]) => acc.replace(`$${k}`, v), to);
}
