"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/common/container";
import { VISION_CONTENT } from "@/data/vision";

const VALUE_CARDS = [
  {
    title: "Leadership",
    line: "Empowering Future Leaders",
    icon: "↑",
    rotate: -5,
    floating: [0, -4, 0],
    duration: 9.2,
    delay: 0,
  },
  {
    title: "Service",
    line: "Serving Communities Together",
    icon: "✦",
    rotate: 4,
    floating: [0, 4, 0],
    duration: 8.6,
    delay: 0.4,
  },
  {
    title: "Fellowship",
    line: "Building Lifelong Connections",
    icon: "•",
    rotate: 6,
    floating: [0, -3, 0],
    duration: 9.8,
    delay: 0.2,
  },
  {
    title: "Innovation",
    line: "Creating Meaningful Change",
    icon: "↗",
    rotate: -3,
    floating: [0, 5, 0],
    duration: 8.8,
    delay: 0.6,
  },
] as const;

export function VisionSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="vision" className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[var(--background)] py-[clamp(4.5rem,8vw,7.5rem)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:radial-gradient(rgba(17,17,17,0.045)_1px,transparent_1px)] [background-size:26px_26px]" />
      <Container className="max-w-[1280px] px-6 md:px-12 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[100px] lg:items-center">
          <div className="space-y-8">
            <div className="relative w-fit pl-1">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                Our Vision
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                <path d="M2 11C20 8 34 12 52 9C72 6 90 10 108 8C126 6 144 11 178 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
              </svg>
            </div>

            <div className="space-y-8">
              <h2 className="max-w-[20ch] font-heading text-[clamp(3.25rem,6.3vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                A District Built Around People.
              </h2>
              <p className="max-w-[560px] text-[clamp(0.98rem,1.1vw,1.04rem)] leading-[1.85] text-[var(--foreground)]/70 text-balance">
                Rotaract District 3141 empowers young leaders through service, fellowship, and meaningful community impact.
                We create spaces where clubs can collaborate, members can grow with confidence, and every project can leave a clear public value.
              </p>
              <div className="grid gap-3 pt-1 sm:grid-cols-3">
                <div className="rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.04)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/44">Leadership</p>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--foreground)]/68">Practical mentorship, clearer direction, and opportunities to step into responsibility.</p>
                </div>
                <div className="rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.04)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/44">Service</p>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--foreground)]/68">Projects designed to meet real needs with consistency, empathy, and measurable outcomes.</p>
                </div>
                <div className="rounded-[22px] border border-[rgba(0,0,0,0.05)] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.04)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/44">Fellowship</p>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--foreground)]/68">A stronger district culture built on trust, shared effort, and long-term connection.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[26rem] lg:min-h-[30rem]">
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 800 560" fill="none">
              <path d="M164 164C242 194 308 224 382 262C466 306 540 320 636 344" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2 12" />
              <path d="M208 404C282 370 354 342 438 322C520 302 590 282 658 238" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="2 14" />
              <circle cx="268" cy="210" r="3" fill="var(--accent)" />
              <circle cx="560" cy="274" r="3" fill="var(--accent)" />
              <circle cx="404" cy="356" r="3" fill="var(--accent)" />
            </svg>

            <div className="relative mx-auto h-full w-full max-w-[640px]">
              <motion.div
                className="absolute left-[6%] top-[6%] w-[230px] rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                initial={false}
                animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 9.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
                style={{ rotate: "-5deg" }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] text-[1rem]">
                    ↑
                  </span>
                  <div className="space-y-2">
                    <p className="text-[0.88rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/88">Leadership</p>
                    <p className="text-[0.84rem] leading-[1.45] text-[var(--foreground)]/62">Empowering Future Leaders</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-[0%] top-[46%] w-[235px] rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                initial={false}
                animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 8.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
                style={{ rotate: "4deg" }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] text-[1rem]">
                    ✦
                  </span>
                  <div className="space-y-2">
                    <p className="text-[0.88rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/88">Service</p>
                    <p className="text-[0.84rem] leading-[1.45] text-[var(--foreground)]/62">Serving Communities Together</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-[6%] top-[28%] w-[236px] rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                initial={false}
                animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 9.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
                style={{ rotate: "6deg" }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] text-[1rem]">
                    •
                  </span>
                  <div className="space-y-2">
                    <p className="text-[0.88rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/88">Fellowship</p>
                    <p className="text-[0.84rem] leading-[1.45] text-[var(--foreground)]/62">Building Lifelong Connections</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-[10%] bottom-[2%] w-[230px] rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                initial={false}
                animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 8.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
                style={{ rotate: "-3deg" }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] text-[1rem]">
                    ↗
                  </span>
                  <div className="space-y-2">
                    <p className="text-[0.88rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/88">Innovation</p>
                    <p className="text-[0.84rem] leading-[1.45] text-[var(--foreground)]/62">Creating Meaningful Change</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
