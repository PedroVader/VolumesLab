import { notFound } from "@tanstack/react-router";
import { PAGES, type PageKey } from "@/data/site";

// Pages the client switches off in the CMS ("Pages on / off") answer 404.
// Runs in the route's beforeLoad, which the router only reaches after the
// root's beforeLoad has applied the CMS bundle, so the switch is current.
export const pageGate = (key: PageKey) => () => {
  if (!PAGES[key]) throw notFound();
};
