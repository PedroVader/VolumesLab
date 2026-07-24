import { createFileRoute, notFound } from "@tanstack/react-router";
import { tests } from "@/data/catalog";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ProductPage } from "@/components/site/ProductPage";

export const Route = createFileRoute("/tests/$slug")({
  component: Page,
  loader: ({ params }) => {
    const product = tests.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
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
      <ProductPage product={product} />
    </SiteChrome>
  );
}
