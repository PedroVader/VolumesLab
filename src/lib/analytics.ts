// Analytics events are sent only after the visitor has explicitly consented.
// Keeping this check here means every existing call site follows the same rule.

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export const ANALYTICS_CONSENT_KEY = "volumeslab-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent(): boolean {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted"
  );
}

export function track(event: string, props: AnalyticsProps = {}): void {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag("event", event, props);
  }
  if (import.meta.env?.DEV) {
    console.debug("[analytics]", event, props);
  }
}
