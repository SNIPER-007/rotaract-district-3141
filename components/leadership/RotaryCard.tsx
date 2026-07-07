"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { RotaryMember } from "@/data/rotary";

interface RotaryCardProps {
  member: RotaryMember;
}

export function RotaryCard({ member }: RotaryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      data-leadership-card="true"
      className="min-h-[20rem] rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.05)] md:p-8"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="space-y-2.5">
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">
          {member.position}
        </p>
        <h3 className="font-heading text-[clamp(1.55rem,2.3vw,2.35rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] text-[var(--foreground)] text-balance">
          {member.name}
        </h3>
      </div>

      <div className="mt-6 space-y-3 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_92%,white)] p-4 text-[0.96rem] leading-[1.65] text-[var(--foreground)]/68">
        <p className="break-words">{member.phone}</p>
        <p className="break-all">{member.email}</p>
      </div>
    </motion.article>
  );
}