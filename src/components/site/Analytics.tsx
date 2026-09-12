import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { ANALYTICS_CONSENT_KEY } from "@/lib/analytics";
import { ANALYTICS_ENABLED } from "@/data/site";

// GA4 measurement IDs are public identifiers. This value is filled when the
// Volumes Lab property is created in Google Analytics.
export const GA_MEASUREMENT_ID = "G-RNN4D7BCHM";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function removeAnalyticsCookies() {
  const domains = [undefined, window.location.hostname, ".volumeslab.com"];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
    }
  }
}

export function Analytics() {
  const location = useLocation();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || consent !== "granted" || !GA_MEASUREMENT_ID) return;

    window.dataLayer ||= [];
    window.gtag ||= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    if (!document.getElementById("google-analytics")) {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

      const script = document.createElement("script");
      script.id = "google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }, [consent]);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || consent !== "granted" || !GA_MEASUREMENT_ID || !window.gtag) return;
    const pagePath = `${location.pathname}${location.searchStr}`;
    if (lastPage.current === pagePath) return;
    lastPage.current = pagePath;
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
    });
  }, [consent, location.pathname, location.searchStr]);

  function saveConsent(value: Consent) {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    setConsent(value);
    setShowPreferences(false);
    if (value === "denied") {
      removeAnalyticsCookies();
    }
  }

  // Switched off: no notice, no "Cookie settings" button, nothing loads.
  if (!ANALYTICS_ENABLED) return null;

  const preferencesOpen = consent === null || showPreferences;

  return (
    <>
      {preferencesOpen ? (
        <section
          aria-label="Analytics preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-foreground bg-background p-5 shadow-2xl md:inset-x-8 md:flex md:items-center md:justify-between md:gap-8"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest">Analytics preferences</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              We use Google Analytics to understand how the site is used. It only loads if you
              accept, and we do not use the data for advertising.
            </p>
          </div>
          <div className="mt-4 flex shrink-0 gap-2 md:mt-0">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="border border-border px-4 py-3 font-mono text-[11px] uppercase tracking-widest hover:border-foreground"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="bg-foreground px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-background hover:bg-primary"
            >
              Accept analytics
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setShowPreferences(true)}
          className="fixed bottom-3 left-3 z-[90] border border-border bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-foreground hover:text-foreground"
        >
          Cookie settings
        </button>
      )}
    </>
  );
}
