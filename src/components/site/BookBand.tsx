import { Link } from "@tanstack/react-router";

export function BookBand({ text = "Book Now" }: { text?: string }) {
  return (
    <Link
      to="/book"
      className="group relative block overflow-hidden bg-primary px-6 py-14 text-primary-foreground transition-colors hover:bg-primary-strong"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-6">
        <span className="flex shrink-0 items-center gap-4 font-display text-2xl font-bold uppercase tracking-tight transition-transform group-hover:translate-x-2 md:text-3xl">
          {text} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
