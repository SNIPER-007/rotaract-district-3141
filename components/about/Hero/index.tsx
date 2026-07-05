"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/common/container";
import { GridBackground } from "@/components/common/grid-background";
import { ABOUT_PAGE_STORY_HERO } from "@/data/about-page-story";

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about-hero" className="relative overflow-hidden bg-[var(--background)] pt-8 text-[var(--foreground)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,245,0.96)_0%,rgba(250,248,245,0.9)_100%)]" />
      <GridBackground className="absolute inset-0 opacity-45" cellSize={48} lineOpacity={0.04} lineColor="17, 17, 17" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,87,255,0.05),transparent_42%)]" />
      <Container className="relative max-w-[1280px] py-[clamp(4.5rem,8vw,7.5rem)]">
        <motion.div
          className="space-y-6 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1
            data-cursor-hero-heading="true"
            className="font-mono text-[clamp(90px,9vw,150px)] font-black uppercase leading-none tracking-[0.26em] text-[var(--foreground)] text-balance"
          >
            {ABOUT_PAGE_STORY_HERO.title}
          </h1>
          <p className="mx-auto max-w-3xl text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.7] text-[var(--foreground)]/72 text-balance">
            {ABOUT_PAGE_STORY_HERO.description}
          </p>
          <p className="mx-auto max-w-[14rem] rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--foreground)]/52">
            Scroll to explore
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
