import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { COMING_SOON } from "@/data/site";
import { ComingSoon } from "@/components/site/ComingSoon";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">[ 404 ]</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-4 text-sm text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest text-white hover:bg-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: COMING_SOON
          ? "Volumes Lab, Madrid · Opening Soon"
          : "Volumes Lab, Human Health & Performance Lab in Madrid",
      },
      {
        name: "description",
        content:
          "Madrid's first boutique Human Health & Performance Lab. VO2max, body composition, strength, mobility and metabolic testing, measured properly, reviewed by physicians. Calle Churruca 5, Chamberí.",
      },
      { name: "author", content: "Volumes Lab" },
      { property: "og:title", content: "Volumes Lab, Human Health & Performance Lab in Madrid" },
      {
        property: "og:description",
        content:
          "Lab-grade health and performance testing in central Madrid. No guesswork, no noise, just a clear picture of you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Volumes Lab, Human Health & Performance Lab in Madrid" },
      { name: "twitter:description", content: "Lab-grade health and performance testing in central Madrid." },
      { property: "og:image", content: "https://volumes-lab.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "625" },
      { property: "og:url", content: "https://volumes-lab.vercel.app" },
      { name: "twitter:image", content: "https://volumes-lab.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      { rel: "preconnect", href: "https://cdn.fontshare.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png?v=2", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Pre-launch gate: while COMING_SOON is on, every route (including deep
  // links people may have saved) shows the placeholder instead of the site.
  if (COMING_SOON) {
    return <ComingSoon />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="bottom-right" theme="light" />
    </QueryClientProvider>
  );
}
