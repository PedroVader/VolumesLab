import { createFileRoute } from "@tanstack/react-router";
import { tests } from "@/data/catalog";
import { requireProduct } from "@/lib/sections";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ProductDetail } from "@/components/site/ProductDetail";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/tests/$slug")({
  component: Page,
  loader: ({ params }) => {
    const product = requireProduct(tests, params.slug);
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
          links: [canonical(`/tests/${loaderData.product.slug}`)],
        }
      : { meta: [{ title: "Test, Volumes Lab" }] },
  notFoundComponent: () => (
    <SiteChrome>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase text-primary">[ 404 ]</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Test not found</h1>
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
