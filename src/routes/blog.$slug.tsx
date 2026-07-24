import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { BookBand } from "@/components/site/BookBand";
import { Eyebrow } from "@/components/site/blocks";
import { getPost, posts } from "@/data/blog";

// Map article categories to the product that measures what the article teaches.
const categoryProduct: Record<string, { slug: string; kind: string; name: string; pitch: string }> = {
  Performance: {
    slug: "vo2max",
    kind: "test",
    name: "VO2Max Test",
    pitch: "Reading about VO2max is step one. Measuring yours takes 60 minutes, mask, treadmill, real numbers.",
  },
  Training: {
    slug: "strength-assessment",
    kind: "test",
    name: "Strength Assessment",
    pitch: "Force plates don't flatter. Get your actual numbers in one 60-minute session.",
  },
  Diagnostics: {
    slug: "3d-body-composition",
    kind: "test",
    name: "3-D Body Composition",
    pitch: "See what you're actually made of, a 30-second scan and a same-day walkthrough.",
  },
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found, Volumes Lab" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title}, Volumes Lab` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
  errorComponent: PostError,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const product = categoryProduct[post.category];

  return (
    <SiteChrome>
      <article className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground"
          >
            ← Back to Journal
          </Link>
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-foreground">
            {post.category}
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            {formatDate(post.date)} · {post.readingTime} · {post.author}
          </p>
        </div>
      </article>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {post.body.map((para: string, i: number) => (
            <p key={i} className="text-lg leading-relaxed text-foreground/85">
              {para}
            </p>
          ))}
        </div>

        {/* Contextual product CTA */}
        {product && (
          <div className="mx-auto mt-16 max-w-3xl border border-foreground p-8">
            <Eyebrow>Measure it</Eyebrow>
            <p className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
              {product.pitch}
            </p>
            <Link
              to={product.kind === "test" ? "/tests/$slug" : "/assessments/$slug"}
              params={{ slug: product.slug }}
              className="mt-6 inline-block bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:opacity-80"
            >
              Book the {product.name} →
            </Link>
          </div>
        )}

        {/* Author credentials */}
        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Written by</p>
          <p className="mt-3 font-display text-xl font-bold uppercase tracking-tight">Volumes Lab</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            The medical and performance team at Calle Churruca 5, Madrid. Every article is written
            from the lab floor, by the people who run the tests, not a content agency.
          </p>
        </div>
      </section>

      <BookBand />

      {others.length > 0 && (
        <section className="border-t border-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Keep reading</Eyebrow>
            <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block border-t border-border pt-6"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {p.category}
                    </p>
                    <p className="mt-3 font-display text-xl font-bold group-hover:opacity-70">
                      {p.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </SiteChrome>
  );
}

function PostNotFound() {
  return (
    <SiteChrome>
      <section className="px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground">404</p>
        <h1 className="mt-6 font-display text-4xl font-extrabold">Article not found.</h1>
        <Link
          to="/blog"
          className="mt-10 inline-block font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70"
        >
          ← Back to Journal
        </Link>
      </section>
    </SiteChrome>
  );
}

function PostError() {
  return (
    <SiteChrome>
      <section className="px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong loading this article.</h1>
      </section>
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
