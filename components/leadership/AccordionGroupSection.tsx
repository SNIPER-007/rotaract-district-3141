"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LeadershipDepartment } from "@/data/leadership";
import { DepartmentAccordion } from "./DepartmentAccordion";

interface AccordionGroupSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  groups: readonly LeadershipDepartment[];
  openGroups: string[];
  onToggle: (name: string) => void;
}

export function AccordionGroupSection({ id, eyebrow, title, groups, openGroups, onToggle }: AccordionGroupSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id={id} className="relative overflow-hidden bg-[var(--background)] py-[clamp(4.5rem,8vw,7rem)] text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 md:px-12 xl:px-20">
        <motion.div
          className="space-y-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="relative w-fit pl-1">
            <p className="font-script text-[22px] font-medium tracking-[0.01em] text-[var(--accent)] rotate-[-3deg]">
              {eyebrow}
            </p>
            <svg aria-hidden="true" viewBox="0 0 180 18" className="mt-1 h-3 w-[9rem] text-[var(--accent)]">
              <path d="M2 11C18 7 35 12 52 9C69 6 88 9 105 8C123 7 142 10 178 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
            </svg>
          </div>
          <h2 className="max-w-[20ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] text-balance">
            {title}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {groups.map((group) => (
            <DepartmentAccordion
              key={group.name}
              department={group}
              members={group.members}
              isOpen={openGroups.includes(group.name)}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}