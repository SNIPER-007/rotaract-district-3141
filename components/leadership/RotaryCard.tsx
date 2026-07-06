"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/common/button";
import type { RotaryMember } from "@/data/rotary";

interface RotaryCardProps {
  member: RotaryMember;
}

function stripPhone(phone: string) {
  return phone.replace(/[^0-9+]/g, "");
}

export function RotaryCard({ member }: RotaryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="space-y-2">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">
          {member.role}
        </p>
        <h3 className="font-heading text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
          {member.name}
        </h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] text-[var(--foreground)]/68">
        <span className="inline-flex items-center gap-2">
          <Phone size={14} />
          {member.phone}
        </span>
        <span className="inline-flex items-center gap-2">
          <Mail size={14} />
          {member.email}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = `tel:${stripPhone(member.phone)}`;
          }}
          className="h-10 rounded-full px-4 text-[0.76rem] font-medium"
        >
          Call
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = `mailto:${member.email}`;
          }}
          className="h-10 rounded-full px-4 text-[0.76rem] font-medium"
        >
          Email
        </Button>
      </div>
    </motion.article>
  );
}