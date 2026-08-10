// Legacy redirect: the on-site cart was removed when booking moved to Momence.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "tests", replace: true });
  },
});
