"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { SUPPORT_DISTRICT_CONTENT } from "@/data/crowdfunding";

export function SupportDistrict() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="support-district" className="relative -mt-[56px] overflow-hidden rounded-t-[56px] bg-[#09111F] py-[clamp(4.5rem,8vw,7.5rem)] text-white">
      <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="space-y-5">
            <div className="relative w-fit pl-2">
              <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                {SUPPORT_DISTRICT_CONTENT.eyebrow}
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[8.5rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>
            <h2 className="max-w-[54rem] font-heading text-[clamp(2.7rem,6vw,5.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-white text-balance">
              {SUPPORT_DISTRICT_CONTENT.heading}
            </h2>
            <p className="max-w-[520px] text-[clamp(0.98rem,1.25vw,1.06rem)] leading-[1.8] text-white/70">
              {SUPPORT_DISTRICT_CONTENT.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary" className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                <span className="inline-flex items-center gap-2">
                  {SUPPORT_DISTRICT_CONTENT.primaryCta}
                  <ArrowRight size={16} />
                </span>
              </Button>
              <Button variant="secondary" className="h-[60px] rounded-full px-9 text-[0.92rem] font-medium">
                <span className="inline-flex items-center gap-2">
                  {SUPPORT_DISTRICT_CONTENT.secondaryCta}
                  <ArrowRight size={16} />
                </span>
              </Button>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_44px_rgba(0,0,0,0.12)] backdrop-blur-md md:p-8">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {SUPPORT_DISTRICT_CONTENT.highlights.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/8 bg-white/8 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-[1.7] text-white/72">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}