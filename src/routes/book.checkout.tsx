import { createFileRoute, redirect } from "@tanstack/react-router";

// The cart and checkout now live on a single coherent page (/cart).
// This route just redirects any old links there.
export const Route = createFileRoute("/book/checkout")({
  beforeLoad: () => {
    throw redirect({ to: "/cart" });
  },
});
