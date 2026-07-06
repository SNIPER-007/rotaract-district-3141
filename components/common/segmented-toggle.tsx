"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface SegmentedToggleOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedToggleProps<T extends string> {
  options: readonly SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedToggle<T extends string>({ options, value, onChange, className = "" }: SegmentedToggleProps<T>) {
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = Math.max(0, options.findIndex((option) => option.value === value));

  return (
    <div
      className={`relative flex w-full rounded-[1.45rem] border border-[rgba(0,0,0,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl ${className}`.trim()}
      role="tablist"
      aria-label="Segmented toggle"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-1.5 rounded-[1.1rem] bg-[linear-gradient(135deg,var(--foreground),color-mix(in_srgb,var(--accent)_82%,var(--foreground)_18%))] shadow-[0_12px_26px_rgba(17,17,17,0.12)]"
        animate={{
          x: `${activeIndex * 100}%`,
          width: `${100 / Math.max(options.length, 1)}%`,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`relative z-[1] flex-1 rounded-[1.1rem] px-4 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] transition-colors duration-300 ${
              isActive ? "text-[var(--background)]" : "text-[var(--foreground)]/64 hover:text-[var(--foreground)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}