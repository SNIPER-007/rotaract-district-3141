"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Signature } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { ABOUT_PAGE_STORY_DRR } from "@/data/about-page-story";
import { PortraitIllustration } from "./PortraitIllustration";

export function DRRMessage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="message" className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
      <Container className="max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:gap-[100px]">
          <motion.div
            className="space-y-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="relative w-fit pl-1">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                {ABOUT_PAGE_STORY_DRR.eyebrow}
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>

            <div className="space-y-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">
                MESSAGE FROM THE DRR
              </p>
              <h2 className="max-w-none whitespace-nowrap font-heading text-[clamp(1.2rem,3vw,3rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.12em] text-[var(--foreground)] text-balance max-sm:max-w-[12ch] max-sm:whitespace-normal max-sm:text-[clamp(2rem,7vw,3rem)]">
                <span className="inline-block">{ABOUT_PAGE_STORY_DRR.nameLines.join(" ")}</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/58">
                {ABOUT_PAGE_STORY_DRR.role}
              </p>
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/58">
                {ABOUT_PAGE_STORY_DRR.tenure}
              </p>
              <p className="max-w-[520px] text-[clamp(1rem,1.15vw,1.06rem)] leading-[1.85] text-[var(--foreground)]/70">
                {ABOUT_PAGE_STORY_DRR.preview}
              </p>
              <div className="pt-2">
                <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                  {ABOUT_PAGE_STORY_DRR.signature}
                </p>
              </div>
              <Button variant="primary" className="h-[60px] rounded-full px-10 text-[0.92rem] font-medium">
                <span className="inline-flex items-center gap-2">
                  {ABOUT_PAGE_STORY_DRR.cta}
                  <ArrowRight size={16} />
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.015 }}
          >
            <div className="rounded-[36px] border border-[rgba(0,0,0,0.05)] bg-[#fbf6ec] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
              <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fbf1de_0%,#fffaf1_52%,#f4e8d3_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_72%)]" />
                <div className="relative p-5 sm:p-6">
                  <PortraitIllustration />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
