"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { MemberPhoto } from "./MemberPhoto";
import type { LeadershipDrr } from "@/data/leadership";

interface DRRCardProps {
  member: LeadershipDrr;
}

export function DRRCard({ member }: DRRCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="district-representative" className="relative overflow-hidden bg-[var(--background)] py-[clamp(3.5rem,6vw,5.5rem)] text-[var(--foreground)]">
      <Container className="max-w-[1440px] px-6 md:px-12 xl:px-20">
        <motion.div
          className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          data-leadership-section="true"
        >
          <div className="rounded-[34px] border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-6">
            <div className="relative w-fit pl-1">
              <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                District Rotaract Representative
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[28px] border border-[rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#f7f0e3_0%,#fbf6ec_100%)] p-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.06)] lg:mx-0 lg:w-[240px] lg:shrink-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))]">
                    <MemberPhoto photo={member.photo} alt={member.name} sizes="240px" />
                  </div>
                </div>

                <div className="space-y-4 lg:flex-1">
                  <div className="space-y-1.5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--foreground)]/50">
                      {member.name}
                    </p>
                    <h2 className="font-heading text-[clamp(2rem,4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[var(--foreground)] text-balance">
                      {member.designation}
                    </h2>
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/52">
                      {member.tenure}
                    </p>
                  </div>

                  <p className="max-w-[54ch] text-[clamp(0.96rem,1.05vw,1rem)] leading-[1.75] text-[var(--foreground)]/72 text-balance">
                    Shreehari Nair guides the district with a calm, connected approach that keeps clubs aligned, service visible, and Rotaract leadership grounded in continuity. This temporary biography can be replaced later without changing the page structure.
                  </p>

                  <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-2deg]">
                    The people behind the district.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.location.href = `tel:${member.phone.replace(/[^0-9+]/g, "")}`;
                      }}
                      className="h-10 rounded-full px-4.5 text-[0.76rem] font-medium"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Phone size={14} />
                        Contact
                        <ArrowRight size={14} />
                      </span>
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.location.href = `mailto:${member.email}`;
                      }}
                      className="h-10 rounded-full px-4.5 text-[0.76rem] font-medium"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Mail size={14} />
                        Email
                        <ArrowRight size={14} />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-[rgba(0,0,0,0.06)] bg-[linear-gradient(180deg,#fbf6ec_0%,#fffdf8_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-6">
            <div className="space-y-4">
              <p className="font-script text-[20px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
                Serving together.
              </p>
              <svg aria-hidden="true" viewBox="0 0 180 18" className="h-3 w-[9rem] text-[var(--accent)]">
                <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
              </svg>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["One District", "Coordinated structure across every club and zone."],
                ["One Team", "Clear accountability with shared district leadership."],
                ["One Vision", "Service, fellowship, and continuity in every decision."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-white p-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]/48">
                    {title}
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--foreground)]/68">
                    {description}
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