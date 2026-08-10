// The CMS is no longer transactional (client architecture, 07/08/2026): there is
// no on-site Book Now catalogue, cart or checkout. Booking happens in Momence.
// This route only exists so old /book and /book?add=<slug> links keep working.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/book")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "tests", replace: true });
  },
});
