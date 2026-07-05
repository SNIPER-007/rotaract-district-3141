"use client";

import { motion, useMotionValue, useReducedMotion, type MotionValue, useTransform } from "framer-motion";

export interface JourneyCardProps {
  title: string;
  description: string;
  note: string;
  tone: "blue" | "yellow" | "green" | "pink";
  align: "left" | "right";
  scrollProgress?: MotionValue<number>;
  floatOffset?: number;
}

const toneStyles: Record<JourneyCardProps["tone"], { background: string; accent: string; shadow: string }> = {
  blue: {
    background: "linear-gradient(180deg, rgba(0,87,255,0.16) 0%, rgba(0,87,255,0.09) 100%)",
    accent: "rgba(0,87,255,0.24)",
    shadow: "0 24px 60px rgba(0,87,255,0.08)",
  },
  yellow: {
    background: "linear-gradient(180deg, rgba(227,197,102,0.22) 0%, rgba(227,197,102,0.12) 100%)",
    accent: "rgba(227,197,102,0.32)",
    shadow: "0 24px 60px rgba(227,197,102,0.08)",
  },
  green: {
    background: "linear-gradient(180deg, rgba(128,201,154,0.22) 0%, rgba(128,201,154,0.11) 100%)",
    accent: "rgba(128,201,154,0.32)",
    shadow: "0 24px 60px rgba(128,201,154,0.08)",
  },
  pink: {
    background: "linear-gradient(180deg, rgba(240,170,193,0.22) 0%, rgba(240,170,193,0.11) 100%)",
    accent: "rgba(240,170,193,0.32)",
    shadow: "0 24px 60px rgba(240,170,193,0.08)",
  },
};

export function JourneyCard({
  title,
  description,
  note,
  tone,
  align,
  scrollProgress,
  floatOffset = 10,
}: JourneyCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const toneStyle = toneStyles[tone];
  const fallbackProgress = useMotionValue(0);
  const parallaxY = useTransform(scrollProgress ?? fallbackProgress, [0, 1], [0, align === "left" ? -floatOffset : floatOffset]);

  return (
    <motion.article
      className={`relative w-full max-w-[620px] rounded-[32px] border border-[rgba(0,0,0,0.05)] p-10 text-[var(--foreground)] ${align === "right" ? "ml-auto" : "mr-auto"}`}
      style={{
        background: toneStyle.background,
        boxShadow: toneStyle.shadow,
        rotate: align === "left" ? "-2deg" : "2deg",
        y: prefersReducedMotion ? 0 : parallaxY,
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--foreground)]/46">
              Journey
            </p>
            <h3 className="max-w-[10ch] font-heading text-[clamp(2.3rem,4vw,3.8rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
              {title}
            </h3>
          </div>
          <div className="hidden rounded-full border border-[rgba(0,0,0,0.06)] bg-white/60 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/55 lg:block">
            {tone}
          </div>
        </div>
        <p className="max-w-[32rem] text-[clamp(0.98rem,1.15vw,1.05rem)] leading-[1.8] text-[var(--foreground)]/72">
          {description}
        </p>
        <div className="flex items-center gap-3 text-[var(--foreground)]/45">
          <span className="font-script text-[22px] font-medium text-[var(--accent)] rotate-[-3deg]">
            {note}
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full border border-[rgba(0,0,0,0.05)] bg-white/50 opacity-60" />
      <div className="pointer-events-none absolute bottom-5 right-6 h-2 w-2 rounded-full bg-[var(--foreground)]/25" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.08]"
        style={{ boxShadow: `inset 0 0 0 1px ${toneStyle.accent}` }}
      />
    </motion.article>
  );
}
