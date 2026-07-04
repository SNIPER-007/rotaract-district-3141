"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <div className="max-w-xl space-y-5 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--foreground)]/48">
          Something went wrong
        </p>
        <h1 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-balance">
          The page could not load.
        </h1>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-[0.92rem] font-medium text-[var(--background)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Try again
        </button>
      </div>
    </main>
  );
}