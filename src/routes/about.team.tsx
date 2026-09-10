// Team page hidden temporarily (client request, 24/08/2026): there are no
// people or photos to show yet. The Team collection in the CMS stays, so when
// the content exists this becomes a page again instead of a redirect — the
// previous implementation is in git history.
import { createFileRoute, redirect } from "@tanstack/react-router";
import { PAGES } from "@/data/site";

export const Route = createFileRoute("/about/team")({
  beforeLoad: () => {
    throw redirect({ to: PAGES.about ? "/about" : "/", replace: true });
  },
});
