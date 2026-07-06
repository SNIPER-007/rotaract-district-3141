"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { LEADERSHIP_HERO } from "@/data/leadership";

export function LeadershipHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="leadership-hero" className="relative overflow-hidden bg-[var(--background)] pt-0 text-[var(--foreground)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,245,0.96)_0%,rgba(250,248,245,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,87,255,0.05),transparent_42%)]" />
      <Container className="relative max-w-[1440px] py-[clamp(3.5rem,7vw,6.25rem)]">
        <motion.div
          className="grid gap-12 lg:grid-cols-1 lg:items-start"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="space-y-8">
            <div className="relative w-fit pl-1" data-leadership-hero-reveal="true">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                {LEADERSHIP_HERO.eyebrow}
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>

            <div className="space-y-5">
              <h1
                data-cursor-hero-heading="true"
                data-leadership-hero-reveal="true"
                className="font-mono text-[clamp(88px,9vw,150px)] font-black uppercase leading-none tracking-[0.26em] text-[var(--foreground)] text-balance"
              >
                {LEADERSHIP_HERO.title}
              </h1>
              <p
                data-leadership-hero-reveal="true"
                className="max-w-[15ch] font-heading text-[clamp(2.4rem,4.8vw,4.5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance"
              >
                {LEADERSHIP_HERO.statement}
              </p>
            </div>

            <div className="space-y-5">
              <p
                data-leadership-hero-reveal="true"
                className="max-w-[560px] text-[clamp(1rem,1.15vw,1.08rem)] leading-[1.85] text-[var(--foreground)]/72 text-balance"
              >
                {LEADERSHIP_HERO.intro}
              </p>
              <p
                data-leadership-hero-reveal="true"
                className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]"
              >
                {LEADERSHIP_HERO.support}
              </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-2" data-leadership-hero-reveal="true">
              <Button variant="primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                <span className="inline-flex items-center gap-2">
                  Contact DRR
                  <ArrowRight size={16} />
                </span>
              </Button>
              <Button variant="secondary" onClick={() => document.getElementById("executive-committee")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                <span className="inline-flex items-center gap-2">
                  Meet Executive Committee
                  <ArrowRight size={16} />
                </span>
              </Button>
            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
