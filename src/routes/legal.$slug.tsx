// The five separate legal pages were replaced by a single /legal page at the
// client's instruction (10/08/2026). Kept as a redirect so any existing link to
// /legal/privacy, /legal/cookies, /legal/terms, /legal/medical-disclaimer or
// /legal/cancellation still lands somewhere valid instead of 404ing — unless
// the client has switched the legal page off in the CMS, in which case it 404s.
import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";

export const Route = createFileRoute("/legal/$slug")({
  beforeLoad: () => {
    pageGate("legal")();
    throw redirect({ to: "/legal", replace: true });
  },
});
