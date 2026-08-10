import { BOOKING_HOME } from "@/lib/momence";
import { track } from "@/lib/analytics";

// Full-width conversion band. Transactional, so it leaves for Momence.
export function BookBand({ text = "Book Services" }: { text?: string }) {
  return (
    <a
      href={BOOKING_HOME}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("book_cta_click", { product: "all", destination: "momence", source_page: "book_band" })}
      className="group relative block overflow-hidden bg-primary px-6 py-14 text-primary-foreground transition-colors hover:bg-primary-strong"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-6">
        <span className="flex shrink-0 items-center gap-4 font-display text-2xl font-bold uppercase tracking-tight transition-transform group-hover:translate-x-2 md:text-3xl">
          {text} <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}
