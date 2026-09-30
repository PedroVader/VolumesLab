import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { metaTags } from "@/data/meta";
import { BookServicesLink } from "@/components/site/cards";
import { Eyebrow } from "@/components/site/blocks";
import { cmsPosts } from "@/lib/cms";
import { blogPage } from "@/data/pages";

export const Route = createFileRoute("/blog")({
  beforeLoad: pageGate("blog"),
  component: BlogRoute,
  // Posts come from the CMS at request time (30s cache), so publishing in
  // Payload shows up here without a deploy. Falls back to the bundled posts
  // if the CMS is unreachable.
  loader: () => cmsPosts().then((posts) => ({ posts })),
  head: () => ({
    meta: metaTags("blog"),
  }),
});

function BlogRoute() {
  const matchRoute = useMatchRoute();
  return matchRoute({ to: "/blog/$slug" }) ? <Outlet /> : <BlogIndex />;
}

function BlogIndex() {
  const { posts } = Route.useLoaderData();
  return (
    <SiteChrome>
      {(blogPage.eyebrow || blogPage.headline || blogPage.intro) && (
        <section className="border-b border-border px-page py-24">
          <div className="mx-auto max-w-6xl">
            {blogPage.eyebrow && <Eyebrow>{blogPage.eyebrow}</Eyebrow>}
            {blogPage.headline && (
              <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
                {blogPage.headline}
              </h1>
            )}
            {blogPage.intro && (
              <p className="mt-8 max-w-2xl text-lg text-muted">{blogPage.intro}</p>
            )}
          </div>
        </section>
      )}

      <section className="px-page py-24">
        <div className="mx-auto max-w-6xl">
          <ul className="divide-y divide-border border-y border-border">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group grid grid-cols-1 gap-8 py-12 md:grid-cols-12"
                >
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                      {p.category}
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted">
                      {formatDate(p.date)} · {p.readingTime}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="font-display text-3xl font-bold tracking-tight group-hover:opacity-70 md:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base text-muted">{p.excerpt}</p>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-foreground">
                      Read →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA. Editable in the CMS (Blog page); cleared = gone. */}
      {(blogPage.cta.eyebrow || blogPage.cta.headline || blogPage.cta.button) && (
        <section className="border-t border-border px-page py-24">
          <div className="mx-auto max-w-4xl text-center">
            {blogPage.cta.eyebrow && <Eyebrow>{blogPage.cta.eyebrow}</Eyebrow>}
            {blogPage.cta.headline && (
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance md:text-5xl">
                {blogPage.cta.headline}
              </h2>
            )}
            {blogPage.cta.button && (
              <div className="mt-10 flex justify-center">
                <BookServicesLink
                  sourcePage="/blog"
                  className="gap-2 border border-foreground bg-foreground font-display text-sm tracking-wide hover:bg-background hover:text-foreground"
                >
                  {blogPage.cta.button} →
                </BookServicesLink>
              </div>
            )}
          </div>
        </section>
      )}
    </SiteChrome>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
