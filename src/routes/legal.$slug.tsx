// The five separate legal pages were replaced by a single /legal page at the
// client's instruction (10/08/2026). Kept as a redirect so any existing link to
// /legal/privacy, /legal/cookies, /legal/terms, /legal/medical-disclaimer or
// /legal/cancellation still lands somewhere valid instead of 404ing.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/legal", replace: true });
  },
});
