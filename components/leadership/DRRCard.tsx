"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/common/button";
import { MemberPhoto } from "./MemberPhoto";
import type { LeadershipDrr } from "@/data/leadership";

interface DRRCardProps {
  member: LeadershipDrr;
  className?: string;
}

export function DRRCard({ member, className = "" }: DRRCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      className={`rounded-[34px] border border-[rgba(0,0,0,0.06)] bg-[linear-gradient(180deg,#fbf6ec_0%,#fffdf8_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-6 ${className}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="space-y-5">
        <div className="relative w-fit pl-1">
          <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
            District Rotaract Representative
          </p>
          <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
            <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          </svg>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[30px] border border-[rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#f7f0e3_0%,#fbf6ec_100%)] p-4 shadow-[0_16px_36px_rgba(0,0,0,0.06)] lg:mx-0 lg:w-[320px] lg:shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))]">
            <MemberPhoto photo={member.photo} alt={member.name} sizes="320px" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--foreground)]/50">
            {member.name}
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[var(--foreground)] text-balance">
            {member.designation}
          </h2>
        </div>

        <p className="max-w-[54ch] text-[clamp(0.96rem,1.05vw,1rem)] leading-[1.75] text-[var(--foreground)]/72 text-balance">
          {member.bio}
        </p>

        <div className="space-y-2 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-white/65 p-4 text-[0.92rem] text-[var(--foreground)]/72">
          <p className="inline-flex items-center gap-2">
            <Phone size={14} />
            {member.phone}
          </p>
          <p className="inline-flex items-center gap-2 break-all">
            <Mail size={14} />
            {member.email}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button
            variant="secondary"
            onClick={() => {
              window.location.href = `tel:${member.phone.replace(/[^0-9+]/g, "")}`;
            }}
            className="h-10 rounded-full px-4.5 text-[0.76rem] font-medium"
          >
            Call DRR
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              window.location.href = `mailto:${member.email}`;
            }}
            className="h-10 rounded-full px-4.5 text-[0.76rem] font-medium"
          >
            Email DRR
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}