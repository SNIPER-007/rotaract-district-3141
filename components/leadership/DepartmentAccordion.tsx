"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import type { LeadershipDepartment, LeadershipMember } from "@/data/leadership";
import { MemberCard } from "./MemberCard";

interface DepartmentAccordionProps {
  department: LeadershipDepartment;
  members: LeadershipMember[];
  isOpen: boolean;
  onToggle: (name: string) => void;
}

export function DepartmentAccordion({ department, members, isOpen, onToggle }: DepartmentAccordionProps) {
  const prefersReducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion || !contentRef.current) {
      return;
    }

    const cards = contentRef.current.querySelectorAll<HTMLElement>("[data-leadership-card]");

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      },
    );
  }, [isOpen, prefersReducedMotion]);

  return (
    <motion.section
      data-leadership-section="true"
      className="rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <button
        type="button"
        data-cursor-button="true"
        onClick={() => onToggle(department.name)}
        className="flex w-full items-center justify-between gap-4 rounded-[28px] px-5 py-5 text-left md:px-6"
        aria-expanded={isOpen}
      >
        <div className="space-y-2">
          <p className="font-script text-[18px] font-medium text-[var(--accent)] rotate-[-2deg]">
            Department
          </p>
          <h3 className="font-heading text-[clamp(1.35rem,2vw,2.1rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
            {department.name}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--surface)_88%,white)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/58">
            {members.length} member{members.length === 1 ? "" : "s"}
          </span>
          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] text-[var(--foreground)]/76 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            <ChevronDown size={18} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={`${department.name}-content`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden px-5 pb-5 md:px-6"
            ref={contentRef}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {members.map((member) => (
                <MemberCard key={member.slug} member={member} compact />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
