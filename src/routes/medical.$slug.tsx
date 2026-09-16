// Service pages moved to the root (client, 14/09/2026): /medical/<slug> is now
// /<slug>. Kept as a permanent redirect so links, bookmarks and search results
// still land; the page itself is src/routes/$slug.tsx.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/medical/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$slug", params: { slug: params.slug }, statusCode: 301, replace: true });
  },
});
