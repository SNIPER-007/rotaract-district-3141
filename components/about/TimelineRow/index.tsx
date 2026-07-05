"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface TimelineRowProps {
  icon: LucideIcon;
  title: string;
  description: string;
  pill: string;
}

export function TimelineRow({ icon: Icon, title, description, pill }: TimelineRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="group grid gap-6 border-t border-[rgba(17,17,17,0.08)] py-6 md:grid-cols-[auto_1fr_auto] md:items-center"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-colors group-hover:bg-[color-mix(in_srgb,var(--accent)_8%,white)] group-hover:text-[var(--accent)]">
          <Icon size={18} />
        </span>
        <h3 className="font-heading text-[clamp(1.3rem,2.2vw,2rem)] font-bold uppercase tracking-[-0.04em] text-[var(--foreground)]">
          {title}
        </h3>
      </div>
      <p className="max-w-2xl text-[clamp(0.98rem,1.1vw,1.05rem)] leading-[1.8] text-[var(--foreground)]/70">
        {description}
      </p>
      <div className="justify-self-start md:justify-self-end">
        <span className="inline-flex rounded-full border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/60 transition-colors group-hover:bg-[color-mix(in_srgb,var(--accent)_10%,white)] group-hover:text-[var(--accent)]">
          {pill}
        </span>
      </div>
    </motion.div>
  );
}
