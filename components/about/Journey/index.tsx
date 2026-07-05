"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/common/container";
import { ABOUT_PAGE_STORY_JOURNEY } from "@/data/about-page-story";
import { JourneyCard } from "../JourneyCard";

export function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
      <Container className="max-w-[1280px]">
        <motion.div
          className="space-y-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[var(--foreground)]/50">
            {ABOUT_PAGE_STORY_JOURNEY.eyebrow}
          </p>
          <h2 className="max-w-3xl font-heading text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
            {ABOUT_PAGE_STORY_JOURNEY.title}
          </h2>
        </motion.div>

        <div className="mt-10 space-y-10 lg:mt-14 lg:space-y-12">
          {ABOUT_PAGE_STORY_JOURNEY.cards.map((card, index) => (
            <div key={card.title} className="relative">
              <JourneyCard
                title={card.title}
                description={card.description}
                note={card.note}
                tone={card.tone}
                align={card.align}
                scrollProgress={scrollYProgress}
                floatOffset={8 + index * 1.5}
              />

              {index < ABOUT_PAGE_STORY_JOURNEY.cards.length - 1 ? (
                <div className={`mt-6 flex items-center justify-center ${index % 2 === 0 ? "lg:justify-start lg:pl-12" : "lg:justify-end lg:pr-12"}`}>
                  <div className="flex items-center gap-3 text-[var(--accent)]/35">
                    <span className="font-script text-[22px] font-medium rotate-[-3deg]">
                      {index === 0 ? "Every step mattered." : index === 1 ? "Growing together." : "One District."}
                    </span>
                    <svg aria-hidden="true" viewBox="0 0 140 40" className="h-10 w-28">
                      <path d="M6 22C30 12 48 12 68 20C86 27 98 28 132 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 6" opacity="0.72" />
                      <path d="M123 11L133 16L126 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
