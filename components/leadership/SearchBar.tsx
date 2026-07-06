"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { LEADERSHIP_SEARCH_FILTERS, type LeadershipFilter } from "@/data/leadership";

interface SearchBarProps {
  query: string;
  filter: LeadershipFilter;
  resultCount: number;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: LeadershipFilter) => void;
}

export function SearchBar({ query, filter, resultCount, onQueryChange, onFilterChange }: SearchBarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="sticky top-[5.5rem] z-40 pt-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      data-leadership-section="true"
    >
      <div className="rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-[rgba(255,255,255,0.88)] p-4 shadow-[0_20px_54px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1">
            <span className="sr-only">Search leaders</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/42" size={18} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search leaders..."
              className="h-14 w-full rounded-full border border-[rgba(0,0,0,0.08)] bg-white pl-11 pr-4 text-[0.98rem] text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--foreground)]/34 focus:border-[rgba(0,87,255,0.24)] focus:shadow-[0_0_0_4px_rgba(0,87,255,0.08)]"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            {LEADERSHIP_SEARCH_FILTERS.map((item) => {
              const isActive = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  data-cursor-button="true"
                  onClick={() => onFilterChange(item.value)}
                  className={`rounded-full px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--foreground)] text-[var(--background)] shadow-[0_12px_26px_rgba(17,17,17,0.14)]"
                      : "border border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                  }`}
                  aria-pressed={isActive}
                >
                  {item.label}
                </button>
              );
            })}
            <span className="ml-1 rounded-full border border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--surface)_88%,white)] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/56">
              {resultCount} results
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
