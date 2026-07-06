"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const width = `${Math.max(0, Math.min(100, value))}%`;

  return (
    <div className="h-2 w-full rounded-full bg-[rgba(17,17,17,0.08)]">
      <motion.div
        className="h-full rounded-full bg-[var(--accent)]"
        initial={prefersReducedMotion ? false : { width: 0 }}
        whileInView={prefersReducedMotion ? undefined : { width }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}