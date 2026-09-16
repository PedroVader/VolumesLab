// One flat address per service: volumeslab.com/<slug>, whichever section the
// SKU sits in (client, 14/09/2026: the sections are informative, there are
// no landing pages, so the URL structure was flattened). The old
// /tests/<slug>, /assessments/<slug>, /medical/<slug>, /training/<slug> and
// /memberships/<slug> addresses redirect here permanently.
//
// Static routes (/about, /faq, /blog, /legal, …) win over this one, so a
// slug that collides with a page name would be unreachable: keep them apart.
import { createFileRoute } from "@tanstack/react-router";
import { requireProductBySlug } from "@/lib/sections";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ProductDetail } from "@/components/site/ProductDetail";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/$slug")({
  component: Page,
  loader: ({ params }) => {
    const product = requireProductBySlug(params.slug);
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.product.name}, Volumes Lab Madrid` },
            { name: "description", content: loaderData.product.tagline },
            { property: "og:title", content: `${loaderData.product.name}, Volumes Lab` },
            { property: "og:description", content: loaderData.product.tagline },
          ],
          links: [canonical(`/${loaderData.product.slug}`)],
        }
      : { meta: [{ title: "Volumes Lab" }] },
  notFoundComponent: () => (
    <SiteChrome>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase text-primary">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Page not found</h1>
      </div>
    </SiteChrome>
  ),
});

function Page() {
  const { product } = Route.useLoaderData();
  return (
    <SiteChrome>
      <ProductDetail product={product} />
    </SiteChrome>
  );
}
