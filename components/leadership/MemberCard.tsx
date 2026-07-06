"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/common/button";
import type { LeadershipMember } from "@/data/leadership";
import { MemberPhoto } from "./MemberPhoto";

interface MemberCardProps {
  member: LeadershipMember;
  compact?: boolean;
}

function stripPhone(phone: string) {
  return phone.replace(/[^0-9+]/g, "");
}

export function MemberCard({ member, compact = false }: MemberCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      data-leadership-card="true"
      className="group rounded-[30px] border border-[rgba(0,0,0,0.06)] bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_26px_60px_rgba(0,0,0,0.1)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02 }}
      layout
    >
      <div className={`flex gap-5 ${compact ? "items-start" : "items-start"}`}>
        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(0,87,255,0.08),rgba(0,87,255,0.02))] shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 group-hover:scale-[1.06]">
          <MemberPhoto photo={member.photo} alt={member.name} sizes="104px" />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-2">
            <h3 className="font-heading text-[clamp(1.35rem,2vw,1.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] text-balance">
              {member.name}
            </h3>
            <p className="max-w-[26rem] text-[clamp(0.98rem,1vw,1.06rem)] leading-[1.6] text-[var(--foreground)]/62">
              {member.designation}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem] text-[var(--foreground)]/68">
            <span className="inline-flex items-center gap-2">
              <Phone size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {member.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {member.email}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = `tel:${stripPhone(member.phone)}`;
              }}
              className="group h-11 rounded-full px-4 text-[0.8rem] font-medium"
            >
              <span className="inline-flex items-center gap-2">
                Call
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = `mailto:${member.email}`;
              }}
              className="group h-11 rounded-full px-4 text-[0.8rem] font-medium"
            >
              <span className="inline-flex items-center gap-2">
                Email
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
