// Provider-agnostic analytics layer (brief section 11.7).
// Events are pushed to a dataLayer-style queue and (in dev) logged. Connect a
// real provider (GA4, Segment, Plausible, …) later by consuming window.dataLayer
// — no call sites need to change. No third-party provider is wired here.

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: AnalyticsProps = {}): void {
  if (typeof window !== "undefined") {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    (w.dataLayer ||= []).push({ event, ...props });
  }
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props);
  }
}
