// Nav is now anchored to the homepage sections; the standalone index page is
// gone. Kept as a redirect so existing links and search results still land.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tests/")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "tests", replace: true });
  },
});
